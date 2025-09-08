import { useState } from "react"
import "./Registration.css"

export default function Registeration() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })
  const [generatedOtp, setGeneratedOtp] = useState(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Generate OTP (simulate email sending)
    const otp = Math.floor(100000 + Math.random() * 900000) // 6-digit OTP
    setGeneratedOtp(otp)
    console.log("OTP sent to email:", otp) // In real app, send email
    setStep(2)
  }

  const handleOtpVerify = (e) => {
    e.preventDefault()
    if (formData.otp === generatedOtp.toString()) {
      alert("Registration successful!")
      setStep(1)
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      })
    } else {
      alert("Invalid OTP, try again.")
    }
  }

  return (
    <div className="register-container">
      {step === 1 && (
        <div className="register-card">
          <h2>Create Account</h2>
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="register-card">
          <h2>OTP Verification</h2>
          <p>An OTP has been sent to your email: <strong>{formData.email}</strong></p>
          <form onSubmit={handleOtpVerify} className="register-form">
            <div className="form-group">
              <label>Enter OTP</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
            </div>
            <button type="submit" className="register-btn">Verify OTP</button>
          </form>
        </div>
      )}
    </div>
  )
}
