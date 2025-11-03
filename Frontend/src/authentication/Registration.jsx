import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added import
import "./Registration.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setMessage(result.message);
        setError("");
        setTimeout(() => {
          // ✅ Pass email to OTP page
          navigate("/users/verify-otp", { state: { email: formData.email } });
        }, 1000);
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration.");
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
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group password-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
