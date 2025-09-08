import { useState } from 'react'
import { Search, Filter, Eye, Package, Truck, CheckCircle } from 'lucide-react'
import './Orders.css'

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      products: ['Neon Dreams Hoodie', 'Cyber Street T-Shirt'],
      total: 135.98,
      status: 'completed',
      date: '2024-01-15',
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      products: ['Galaxy Print Jacket'],
      total: 149.99,
      status: 'processing',
      date: '2024-01-14',
      address: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      products: ['Futuristic Cargo Pants', 'Holographic Crop Top'],
      total: 119.98,
      status: 'shipped',
      date: '2024-01-13',
      address: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      products: ['Vaporwave Sweatshirt'],
      total: 69.99,
      status: 'pending',
      date: '2024-01-12',
      address: '321 Elm St, Miami, FL 33101'
    },
    {
      id: '#ORD-005',
      customer: 'Tom Brown',
      email: 'tom@example.com',
      products: ['Synthwave Bomber', 'Tech Ninja Mask'],
      total: 159.98,
      status: 'cancelled',
      date: '2024-01-11',
      address: '654 Maple Dr, Seattle, WA 98101'
    }
  ]

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled']

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package size={16} />
      case 'processing':
        return <Package size={16} />
      case 'shipped':
        return <Truck size={16} />
      case 'completed':
        return <CheckCircle size={16} />
      default:
        return <Package size={16} />
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-active'
      case 'shipped':
        return 'status-active'
      case 'processing':
        return 'status-pending'
      case 'pending':
        return 'status-pending'
      case 'cancelled':
        return 'status-inactive'
      default:
        return 'status-pending'
    }
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Orders Management</h1>
          <p>Track and manage customer orders</p>
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-item">
          <div className="stat-icon pending">
            <Package size={20} />
          </div>
          <div className="stat-info">
            <h3>24</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon processing">
            <Package size={20} />
          </div>
          <div className="stat-info">
            <h3>18</h3>
            <p>Processing</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon shipped">
            <Truck size={20} />
          </div>
          <div className="stat-info">
            <h3>32</h3>
            <p>Shipped</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon completed">
            <CheckCircle size={20} />
          </div>
          <div className="stat-info">
            <h3>156</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      <div className="orders-filters">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search orders, customers..."
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
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="order-id">{order.id}</span>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.customer}</div>
                      <div className="customer-email">{order.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="products-list">
                      {order.products.map((product, index) => (
                        <span key={index} className="product-tag">
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="order-total">${order.total}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn" title="View Details">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders