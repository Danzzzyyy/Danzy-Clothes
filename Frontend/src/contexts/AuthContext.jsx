import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "" // your production URL
      : "http://localhost:9000";

  // 🔹 Load saved user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // 🧩 REGISTER
  const register = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        name,
        email,
        password,
      });

      if (response.data?.success) {
        return {
          success: true,
          email: response.data.data.email,
          message: "OTP sent to your email. Please verify.",
        };
      }

      return { success: false, message: response.data?.message || "Registration failed." };
    } catch (err) {
      console.error("Registration failed:", err?.response?.data || err.message);
      return {
        success: false,
        message:
          err?.response?.data?.message || "An error occurred during registration.",
      };
    }
  };

  // 🧩 OTP VERIFICATION
  const otpVerification = async ({ email, otp }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/verify-otp`, {
        email,
        otp,
      });

      if (response.data?.success) {
        const { user, accessToken, refreshToken } = response.data.data;

        const loggedInUser = {
          id: user._id,
          name: user.name,
          email: user.email,
          accessToken,
          refreshToken,
        };

        setCurrentUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        return { success: true, message: "OTP verified successfully!" };
      }

      return { success: false, message: response.data?.message || "Invalid OTP." };
    } catch (err) {
      console.error("OTP verification failed:", err?.response?.data || err.message);
      return {
        success: false,
        message:
          err?.response?.data?.message ||
          "An error occurred during OTP verification.",
      };
    }
  };

  // 🧩 LOGIN
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      if (response.data?.success) {
        const { user, accessToken, refreshToken } = response.data.data;

        const loggedInUser = {
          id: user._id,
          name: user.name,
          email: user.email,
          accessToken,
          refreshToken,
        };

        setCurrentUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        return { success: true, message: "Logged in successfully!" };
      }

      return { success: false, message: "Login failed. Please try again." };
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
      return {
        success: false,
        message: err?.response?.data?.message || "An error occurred during login.",
      };
    }
  };

  // 🧩 LOGOUT
  const logout = async () => {
    try {
      if (currentUser?.accessToken) {
        await axios.post(
          `${BASE_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
      }
    } catch (err) {
      console.warn("Logout request failed:", err.message);
    }

    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        register,
        otpVerification,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
