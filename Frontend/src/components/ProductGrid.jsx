import { useState } from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

const products = [
  {
    id: 1,
    name: "Neon Dreams Hoodie",
    price: 89.99,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    category: "Hoodies",
    colors: ["Black", "White", "Purple"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Cyber Street T-Shirt",
    price: 45.99,
    image: "https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg",
    category: "T-Shirts",
    colors: ["Black", "White", "Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    name: "Galaxy Print Jacket",
    price: 149.99,
    image: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg",
    category: "Jackets",
    colors: ["Black", "Navy", "Purple"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Futuristic Cargo Pants",
    price: 79.99,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    category: "Pants",
    colors: ["Black", "Gray", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    name: "Holographic Crop Top",
    price: 39.99,
    image: "https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg",
    category: "Tops",
    colors: ["Silver", "Pink", "Blue"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 6,
    name: "Vaporwave Sweatshirt",
    price: 69.99,
    image: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg",
    category: "Sweatshirts",
    colors: ["Pink", "Blue", "Purple"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Tech Ninja Mask",
    price: 29.99,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
    category: "Accessories",
    colors: ["Black", "White", "Gray"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Synthwave Bomber",
    price: 129.99,
    image: "https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg",
    category: "Jackets",
    colors: ["Black", "Purple", "Blue"],
    sizes: ["S", "M", "L", "XL"]
  }
]

const categories = ["All", "Hoodies", "T-Shirts", "Jackets", "Pants", "Tops", "Sweatshirts", "Accessories"]

const ProductGrid = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <section className="product-grid-section" id="shop">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Collection</h2>
          <p className="section-description">
            Discover unique pieces that blend style with anime-inspired aesthetics
          </p>
        </div>

        <div className="filters">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid