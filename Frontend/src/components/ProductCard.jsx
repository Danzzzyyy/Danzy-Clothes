import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import './ProductCard.css'

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      size: selectedSize,
      color: selectedColor
    })
  }

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        <div className={`card-overlay ${isHovered ? 'visible' : ''}`}>
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} fill={isLiked ? '#ff6b9d' : 'none'} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-category">{product.category}</span>
        </div>

        <div className="product-options">
          <div className="color-options">
            <span className="option-label">Color:</span>
            <div className="color-swatches">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ 
                    background: color.toLowerCase() === 'black' ? '#000' : 
                               color.toLowerCase() === 'white' ? '#fff' : 
                               color.toLowerCase() === 'purple' ? '#8b5cf6' :
                               color.toLowerCase() === 'blue' ? '#3b82f6' :
                               color.toLowerCase() === 'pink' ? '#ec4899' :
                               color.toLowerCase() === 'gray' ? '#6b7280' :
                               color.toLowerCase() === 'navy' ? '#1e3a8a' :
                               color.toLowerCase() === 'olive' ? '#65a30d' :
                               color.toLowerCase() === 'silver' ? '#c0c0c0' :
                               color.toLowerCase()
                  }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="size-options">
            <span className="option-label">Size:</span>
            <div className="size-buttons">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="price">${product.price}</div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard