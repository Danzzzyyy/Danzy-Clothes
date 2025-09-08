import { Menu, Bell, Search, User } from 'lucide-react'
import './AdminHeader.css'

const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products, orders, customers..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-menu">
          <button className="user-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader