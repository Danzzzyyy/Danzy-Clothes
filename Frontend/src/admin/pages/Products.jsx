import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import './Products.css'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Neon Dreams Hoodie',
      category: 'Hoodies',
      price: 89.99,
      stock: 45,
      status: 'active',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    },
    {
      id: 2,
      name: 'Cyber Street T-Shirt',
      category: 'T-Shirts',
      price: 45.99,
      stock: 23,
      status: 'active',
      image: 'https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg'
    },
    {
      id: 3,
      name: 'Galaxy Print Jacket',
      category: 'Jackets',
      price: 149.99,
      stock: 12,
      status: 'active',
      image: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg'
    },
    {
      id: 4,
      name: 'Futuristic Cargo Pants',
      category: 'Pants',
      price: 79.99,
      stock: 0,
      status: 'inactive',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    },
    {
      id: 5,
      name: 'Holographic Crop Top',
      category: 'Tops',
      price: 39.99,
      stock: 67,
      status: 'active',
      image: 'https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg'
    }
  ]

  const categories = ['all', 'Hoodies', 'T-Shirts', 'Jackets', 'Pants', 'Tops', 'Accessories']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const AddProductModal = () => (
    <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Product</h2>
          <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
        </div>
        <form className="product-form">
          <div className="form-row">
            <div className="admin-form-group">
              <label className="admin-label">Product Name</label>
              <input type="text" className="admin-input" placeholder="Enter product name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select className="admin-select">
                <option>Select category</option>
                <option>Hoodies</option>
                <option>T-Shirts</option>
                <option>Jackets</option>
                <option>Pants</option>
                <option>Tops</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="admin-form-group">
              <label className="admin-label">Price ($)</label>
              <input type="number" className="admin-input" placeholder="0.00" step="0.01" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Stock Quantity</label>
              <input type="number" className="admin-input" placeholder="0" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" placeholder="Enter product description"></textarea>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Product Image URL</label>
            <input type="url" className="admin-input" placeholder="https://example.com/image.jpg" />
          </div>
          <div className="modal-actions">
            <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Products Management</h1>
          <p>Manage your product inventory and listings</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="products-filters">
        <div className="search-filter">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="category-filter">
          <Filter size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
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
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`stock-badge ${product.stock === 0 ? 'out-of-stock' : product.stock < 20 ? 'low-stock' : 'in-stock'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${product.status === 'active' ? 'active' : 'inactive'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn edit-btn">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddProductModal />}
    </div>
  )
}

export default Products