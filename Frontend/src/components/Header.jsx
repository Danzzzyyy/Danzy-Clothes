import { useState } from "react"
import { ShoppingCart, Menu, X, Search, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

const Header = ({ cartItemsCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Danzyyy...</h1>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
            <Link to="/" className="nav-link">Home</Link>
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#categories" className="nav-link">Categories</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="header-actions">
            <button className="search-btn">
              <Search size={20} />
            </button>

            <button className="cart-btn" onClick={onCartClick}>
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={20} />
              </button>

              {isProfileOpen && (
                <div className="dropdown-menu">
                  <a
                    onClick={() => {
                      setIsProfileOpen(false)
                      navigate("/users/login")
                    }}
                  >
                    Login
                  </a>
                  {/* <a
                    onClick={() => {
                      setIsProfileOpen(false)
                      alert("Sign Up clicked!")
                    }}
                  >
                    Sign Up
                  </a> */}
                </div>
              )}
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
