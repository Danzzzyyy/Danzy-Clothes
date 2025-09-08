import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import './Cart.css'

const Cart = ({ items, total, onClose, onRemove, onUpdateQuantity }) => {
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!')
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">
            <ShoppingBag size={24} />
            Your Cart ({items.length})
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={64} />
              <h3>Your cart is empty</h3>
              <p>Add some amazing items to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-options">
                        <span className="item-size">Size: {item.size}</span>
                        <span className="item-color">Color: {item.color}</span>
                      </div>
                      <div className="item-price">${item.price}</div>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => onRemove(item.id, item.size)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="total-row total-final">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart