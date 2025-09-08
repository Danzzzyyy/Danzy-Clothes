import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import './Analytics.css'

const Analytics = () => {
  const salesData = [
    { month: 'Jan', sales: 12500, orders: 145 },
    { month: 'Feb', sales: 15200, orders: 178 },
    { month: 'Mar', sales: 18900, orders: 203 },
    { month: 'Apr', sales: 16800, orders: 189 },
    { month: 'May', sales: 22100, orders: 234 },
    { month: 'Jun', sales: 25600, orders: 267 }
  ]

  const topCategories = [
    { name: 'Hoodies', sales: 45600, percentage: 35 },
    { name: 'T-Shirts', sales: 32400, percentage: 25 },
    { name: 'Jackets', sales: 28800, percentage: 22 },
    { name: 'Pants', sales: 15600, percentage: 12 },
    { name: 'Accessories', sales: 7800, percentage: 6 }
  ]

  const recentActivity = [
    { type: 'sale', message: 'New order #ORD-156 - $89.99', time: '2 minutes ago' },
    { type: 'customer', message: 'New customer registration - Jane Doe', time: '15 minutes ago' },
    { type: 'sale', message: 'Order #ORD-155 completed - $149.99', time: '32 minutes ago' },
    { type: 'product', message: 'Low stock alert - Neon Dreams Hoodie', time: '1 hour ago' },
    { type: 'sale', message: 'New order #ORD-154 - $45.99', time: '2 hours ago' }
  ]

  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+23.5%',
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      trend: 'up',
      description: '+0.4% from last month'
    },
    {
      title: 'Avg Order Value',
      value: '$87.50',
      trend: 'up',
      description: '+$12.30 from last month'
    },
    {
      title: 'Customer Retention',
      value: '68%',
      trend: 'down',
      description: '-2% from last month'
    }
  ]

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Analytics Dashboard</h1>
          <p>Track your store's performance and insights</p>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <h3>{metric.title}</h3>
              <div className={`metric-trend ${metric.trend}`}>
                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-description">{metric.description}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="chart-section">
          <div className="section-header">
            <h2>Sales Overview</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color sales"></div>
                <span>Sales ($)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color orders"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="chart-container">
              <div className="chart-bars">
                {salesData.map((data, index) => (
                  <div key={index} className="bar-group">
                    <div className="bar-container">
                      <div 
                        className="bar sales-bar" 
                        style={{ height: `${(data.sales / 30000) * 100}%` }}
                        title={`$${data.sales.toLocaleString()}`}
                      ></div>
                      <div 
                        className="bar orders-bar" 
                        style={{ height: `${(data.orders / 300) * 100}%` }}
                        title={`${data.orders} orders`}
                      ></div>
                    </div>
                    <div className="bar-label">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="categories-section">
          <div className="section-header">
            <h2>Top Categories</h2>
          </div>
          <div className="admin-card">
            <div className="categories-list">
              {topCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <div className="category-name">{category.name}</div>
                    <div className="category-sales">${category.sales.toLocaleString()}</div>
                  </div>
                  <div className="category-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="progress-percentage">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="activity-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="admin-card">
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'sale' && <DollarSign size={16} />}
                  {activity.type === 'customer' && <Users size={16} />}
                  {activity.type === 'product' && <ShoppingCart size={16} />}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics