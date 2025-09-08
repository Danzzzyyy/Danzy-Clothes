import { useState } from 'react'
import { Save, Upload, Bell, Shield, Palette, Globe } from 'lucide-react'
import './Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  const GeneralSettings = () => (
    <div className="settings-section">
      <h3>Store Information</h3>
      <div className="form-row">
        <div className="admin-form-group">
          <label className="admin-label">Store Name</label>
          <input type="text" className="admin-input" defaultValue="AnimeWear" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Store URL</label>
          <input type="text" className="admin-input" defaultValue="animewear.com" />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Store Description</label>
        <textarea 
          className="admin-textarea" 
          defaultValue="Express your unique style with our anime-inspired fashion collection."
        />
      </div>
      <div className="form-row">
        <div className="admin-form-group">
          <label className="admin-label">Contact Email</label>
          <input type="email" className="admin-input" defaultValue="contact@animewear.com" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Phone Number</label>
          <input type="tel" className="admin-input" defaultValue="+1 (555) 123-4567" />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-label">Store Logo</label>
        <div className="file-upload">
          <button className="upload-btn">
            <Upload size={16} />
            Upload Logo
          </button>
          <span className="file-info">PNG, JPG up to 2MB</span>
        </div>
      </div>
    </div>
  )

  const AppearanceSettings = () => (
    <div className="settings-section">
      <h3>Theme Settings</h3>
      <div className="theme-options">
        <div className="theme-option active">
          <div className="theme-preview anime">
            <div className="preview-header"></div>
            <div className="preview-content"></div>
          </div>
          <span>Anime Style (Current)</span>
        </div>
        <div className="theme-option">
          <div className="theme-preview minimal">
            <div className="preview-header"></div>
            <div className="preview-content"></div>
          </div>
          <span>Minimal</span>
        </div>
        <div className="theme-option">
          <div className="theme-preview dark">
            <div className="preview-header"></div>
            <div className="preview-content"></div>
          </div>
          <span>Dark Mode</span>
        </div>
      </div>
      
      <h3>Color Customization</h3>
      <div className="color-settings">
        <div className="color-group">
          <label className="admin-label">Primary Color</label>
          <div className="color-input-group">
            <input type="color" className="color-input" defaultValue="#ff6b9d" />
            <input type="text" className="admin-input" defaultValue="#ff6b9d" />
          </div>
        </div>
        <div className="color-group">
          <label className="admin-label">Secondary Color</label>
          <div className="color-input-group">
            <input type="color" className="color-input" defaultValue="#4facfe" />
            <input type="text" className="admin-input" defaultValue="#4facfe" />
          </div>
        </div>
      </div>
    </div>
  )

  const NotificationSettings = () => (
    <div className="settings-section">
      <h3>Email Notifications</h3>
      <div className="notification-options">
        <div className="notification-item">
          <div className="notification-info">
            <h4>New Orders</h4>
            <p>Get notified when new orders are placed</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="notification-item">
          <div className="notification-info">
            <h4>Low Stock Alerts</h4>
            <p>Receive alerts when products are running low</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="notification-item">
          <div className="notification-info">
            <h4>Customer Reviews</h4>
            <p>Get notified about new customer reviews</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="notification-item">
          <div className="notification-info">
            <h4>Weekly Reports</h4>
            <p>Receive weekly sales and analytics reports</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  )

  const SecuritySettings = () => (
    <div className="settings-section">
      <h3>Password & Security</h3>
      <div className="form-row">
        <div className="admin-form-group">
          <label className="admin-label">Current Password</label>
          <input type="password" className="admin-input" />
        </div>
      </div>
      <div className="form-row">
        <div className="admin-form-group">
          <label className="admin-label">New Password</label>
          <input type="password" className="admin-input" />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Confirm New Password</label>
          <input type="password" className="admin-input" />
        </div>
      </div>
      
      <h3>Two-Factor Authentication</h3>
      <div className="security-option">
        <div className="security-info">
          <h4>Enable 2FA</h4>
          <p>Add an extra layer of security to your account</p>
        </div>
        <button className="admin-btn admin-btn-secondary">Enable 2FA</button>
      </div>
      
      <h3>Login Sessions</h3>
      <div className="sessions-list">
        <div className="session-item">
          <div className="session-info">
            <h4>Current Session</h4>
            <p>Chrome on Windows • New York, NY</p>
            <span className="session-time">Active now</span>
          </div>
          <span className="session-status current">Current</span>
        </div>
        <div className="session-item">
          <div className="session-info">
            <h4>Mobile Session</h4>
            <p>Safari on iPhone • Los Angeles, CA</p>
            <span className="session-time">2 hours ago</span>
          </div>
          <button className="admin-btn admin-btn-outline">Revoke</button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />
      case 'appearance':
        return <AppearanceSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'security':
        return <SecuritySettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Settings</h1>
          <p>Manage your store settings and preferences</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="settings-content">
          <div className="admin-card">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings