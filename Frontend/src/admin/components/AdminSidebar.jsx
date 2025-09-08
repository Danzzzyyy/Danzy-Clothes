import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  X,
  ChevronRight
} from 'lucide-react'
import './AdminSidebar.css'

const AdminSidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleItemClick = (itemId) => {
    setCurrentPage(itemId)
    setIsOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>AnimeWear Admin</h2>
          </div>
          <button className="sidebar-close" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                <ChevronRight size={16} className="nav-arrow" />
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar">
              <span>A</span>
            </div>
            <div className="profile-info">
              <p className="profile-name">Admin User</p>
              <p className="profile-role">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar