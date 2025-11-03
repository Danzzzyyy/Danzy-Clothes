import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./authentication/Login";
import Otp from "./authentication/Otp";
import Registration from "./authentication/Registration";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ Import AuthProvider
import "./App.css";

function Home({ addToCart }) {
  return (
    <>
      <Hero />
      <ProductGrid onAddToCart={addToCart} />
      <Footer />
    </>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity === 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header
            cartItemsCount={cartItemsCount}
            onCartClick={() => setIsCartOpen(true)}
          />

          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Registration />} />
            <Route path="/users/verify-otp" element={<Otp />} />
          </Routes>

          {isCartOpen && (
            <Cart
              items={cartItems}
              total={cartTotal}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
