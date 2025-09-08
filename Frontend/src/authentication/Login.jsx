import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate() // React Router navigation

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Logging in with ${email}`)
    // TODO: Add real authentication logic
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue shopping</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email" 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Enter your password" 
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span 
            className="signup-link"
            onClick={() => navigate("/user/registration")} // SPA navigation
            style={{ cursor: "pointer", color: "#ff6b9d", textDecoration: "underline" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}
