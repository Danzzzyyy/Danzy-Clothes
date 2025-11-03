import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ for navigation
import "./Registration.css";
import { useAuth } from "../contexts/AuthContext";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation(); // ✅ get router state
  const navigate = useNavigate();
  const email = location.state?.email || ""; // ✅ get email from register page

  const { otpVerification } = useAuth(); // ✅ from context

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    if (value.length <= 6) setOtp(value);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const result = await otpVerification({
        email, // from location.state
        otp,   // user input
      });

      if (result.success) {
        setMessage(result.message);
        setError("");
        setTimeout(() => {
          navigate("/users/login"); // redirect to login after success
        }, 1000);
      } else {
        setError(result.message || "OTP verification failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img
          src="https://imgs.search.brave.com/0Vd228ABNJM1fyyiLil7Y7y4-nubj5mN2a2S6-IsSJ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzEwLzExLzQ1/LzM2MF9GXzE1MTAx/MTQ1ODBfdkV4VFFi/MFEyMmJXRXZ5ZkRr/U3NrSGZSV2ZueTEw/Y1IuanBn"
          alt="logo"
        />
        <h2>OTP Verification</h2>
        <p>
          Please enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="otp-section">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            className="otp-single-input"
            placeholder="Enter OTP"
          />
        </div>

        <button
          type="button"
          className="register-btn mt-4"
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
