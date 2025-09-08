import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'secondary'
    },
    {
      title: 'Total Customers',
      value: '856',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'success'
    },
    {
      title: 'Products',
      value: '142',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'warning'
    }
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Neon Dreams Hoodie', amount: '$89.99', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Cyber Street T-Shirt', amount: '$45.99', status: 'pending' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Galaxy Print Jacket', amount: '$149.99', status: 'processing' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Futuristic Cargo Pants', amount: '$79.99', status: 'completed' },
    { id: '#ORD-005', customer: 'Tom Brown', product: 'Holographic Crop Top', amount: '$39.99', status: 'pending' }
  ]

  const topProducts = [
    { name: 'Neon Dreams Hoodie', sales: 156, revenue: '$14,044' },
    { name: 'Cyber Street T-Shirt', sales: 134, revenue: '$6,159' },
    { name: 'Galaxy Print Jacket', sales: 98, revenue: '$14,699' },
    { name: 'Vaporwave Sweatshirt', sales: 87, revenue: '$6,089' },
    { name: 'Synthwave Bomber', sales: 76, revenue: '$9,874' }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <div className={`stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="admin-btn admin-btn-outline">
              <Eye size={16} />
              View All
            </button>
          </div>
          <div className="admin-card">
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span className={`status-badge status-${order.status === 'completed' ? 'active' : order.status === 'pending' ? 'pending' : 'inactive'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Top Products</h2>
            <button className="admin-btn admin-btn-outline">
              <TrendingUp size={16} />
              View Report
            </button>
          </div>
          <div className="admin-card">
            <div className="top-products">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.sales} sales</p>
                  </div>
                  <div className="product-revenue">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard