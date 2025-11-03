import dotenv from "dotenv";
dotenv.config();

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import nodemailer from "nodemailer";

// 🔹 Replace with your logo URL
const logoUrl =
  "https://www.instagram.com/danzy.clothing/";
// 🔹 Helper to generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 🔹 Setup mail transporter (Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // ⚠️ Use Gmail App Password, not your normal password
  },
});

// ✅ Verify transporter connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Transporter Error:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

// 🔹 Generate Access + Refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// 🧩 1️⃣ REGISTER USER — only creates user + sends OTP
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new ApiError(400, "All fields are required");

  const existedUser = await User.findOne({ email });
  if (existedUser)
    throw new ApiError(409, "User with this email already exists");

  // 🔸 Generate OTP
  const otp = generateOTP();
  const otpExpires = Date.now() + 10 * 60 * 1000; // valid for 10 minutes

  // 🔸 Create unverified user
  const user = await User.create({
    name,
    email,
    password,
    otp,
    otpExpires,
    isVerified: false,
  });

  // 📧 Send OTP email
  const mailOptions = {
    from: `"Danzy Clothing" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Verify your account",
    html: `
      <div style="font-family:Arial,sans-serif;text-align:center;background:#f8f8f8;padding:20px;">
        <img src="${logoUrl}" alt="Logo" style="width:100px;margin-bottom:15px;">
        <h2 style="color:#333;">Welcome, ${name}!</h2>
        <p>Your OTP to verify your account is:</p>
        <h1 style="letter-spacing:4px;color:#4CAF50;">${otp}</h1>
        <p style="color:#555;">This OTP is valid for 10 minutes.</p>
        <p style="font-size:12px;color:#999;">If you didn’t request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new ApiError(500, "Failed to send OTP email");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      { email: user.email },
      "User registered successfully. OTP sent to email.",
      "success"
    )
  );
});

// 🧩 2️⃣ VERIFY OTP — verify email, then issue tokens
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  if (user.isVerified)
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User already verified", "success"));

  if (user.otp !== otp) throw new ApiError(400, "Invalid OTP");
  if (user.otpExpires < Date.now()) throw new ApiError(400, "OTP has expired");

  // ✅ Verify user & clean OTP fields
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  // ✅ Generate access & refresh tokens
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user._id);

  await user.save({ validateBeforeSave: false });

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: safeUser, accessToken, refreshToken },
      "OTP verified successfully. User logged in.",
      "success"
    )
  );
});

// 🧩 3️⃣ LOGIN USER — only verified users can log in
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  if (!user.isVerified)
    throw new ApiError(401, "Please verify your email first");

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user._id);

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: safeUser, accessToken, refreshToken },
      "User logged in successfully",
      "success"
    )
  );
});

// 🧩 4️⃣ LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully", "success"));
});
