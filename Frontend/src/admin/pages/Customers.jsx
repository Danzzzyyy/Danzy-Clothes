import { useState } from 'react'
import { Search, Filter, Eye, Mail, Phone } from 'lucide-react'
import './Customers.css'

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      orders: 12,
      totalSpent: 1245.67,
      status: 'active',
      joinDate: '2023-08-15',
      lastOrder: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      orders: 8,
      totalSpent: 892.34,
      status: 'active',
      joinDate: '2023-09-22',
      lastOrder: '2024-01-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      orders: 15,
      totalSpent: 2156.89,
      status: 'active',
      joinDate: '2023-07-10',
      lastOrder: '2024-01-13'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      orders: 3,
      totalSpent: 234.56,
      status: 'inactive',
      joinDate: '2023-11-05',
      lastOrder: '2023-12-20'
    },
    {
      id: 5,
      name: 'Tom Brown',
      email: 'tom@example.com',
      phone: '+1 (555) 567-8901',
      orders: 6,
      totalSpent: 567.89,
      status: 'active',
      joinDate: '2023-10-18',
      lastOrder: '2024-01-11'
    }
  ]

  const statusOptions = ['all', 'active', 'inactive']

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getCustomerTier = (totalSpent) => {
    if (totalSpent >= 2000) return { tier: 'VIP', class: 'tier-vip' }
    if (totalSpent >= 1000) return { tier: 'Gold', class: 'tier-gold' }
    if (totalSpent >= 500) return { tier: 'Silver', class: 'tier-silver' }
    return { tier: 'Bronze', class: 'tier-bronze' }
  }

  return (
    <div className="customers-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Customers Management</h1>
          <p>Manage and track customer information</p>
        </div>
      </div>

      <div className="customers-stats">
        <div className="stat-item">
          <div className="stat-icon total">
            <Eye size={20} />
          </div>
          <div className="stat-info">
            <h3>{customers.length}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon active">
            <Eye size={20} />
          </div>
          <div className="stat-info">
            <h3>{customers.filter(c => c.status === 'active').length}</h3>
            <p>Active Customers</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon revenue">
            <Eye size={20} />
          </div>
          <div className="stat-info">
            <h3>${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(0)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon orders">
            <Eye size={20} />
          </div>
          <div className="stat-info">
            <h3>{customers.reduce((sum, c) => sum + c.orders, 0)}</h3>
            <p>Total Orders</p>
          </div>
        </div>
      </div>

      <div className="customers-filters">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="status-filter">
          <Filter size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Tier</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const tierInfo = getCustomerTier(customer.totalSpent)
                return (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="customer-info">
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-id">ID: #{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <Mail size={14} />
                          <span>{customer.email}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={14} />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="orders-count">{customer.orders}</span>
                    </td>
                    <td>
                      <span className="total-spent">${customer.totalSpent.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className={`tier-badge ${tierInfo.class}`}>
                        {tierInfo.tier}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-${customer.status === 'active' ? 'active' : 'inactive'}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.joinDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn view-btn" title="View Details">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customers