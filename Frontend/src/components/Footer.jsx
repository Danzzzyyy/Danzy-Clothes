import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">AnimeWear</h3>
              <p className="footer-description">
                Express your unique style with our anime-inspired fashion collection. 
                Quality meets creativity in every piece.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Categories</h4>
              <ul className="footer-links">
                <li><a href="#hoodies">Hoodies</a></li>
                <li><a href="#tshirts">T-Shirts</a></li>
                <li><a href="#jackets">Jackets</a></li>
                <li><a href="#accessories">Accessories</a></li>
                <li><a href="#new-arrivals">New Arrivals</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Customer Service</h4>
              <ul className="footer-links">
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#size-guide">Size Guide</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              <p>© 2024 AnimeWear. Made with <Heart size={16} fill="#ff6b9d" /> for anime fashion lovers.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer