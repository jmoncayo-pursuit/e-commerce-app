import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/profile/Profile';
import { useAuthStore } from './stores/authStore';
import './App.css';
// Lazy-load or import these as you implement them
// import ProductList from './pages/products/ProductList';
// import ProductDetail from './pages/products/ProductDetail';
// import Cart from './pages/cart/Cart';
// import Checkout from './pages/checkout/Checkout';
// import Profile from './pages/profile/Profile';

function App() {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<div className="container mt-5"><h2>About Us</h2><p>Collectiverse is a platform for collectors and enthusiasts to find rare and unique collectibles.</p></div>} />
          <Route path="contact" element={<div className="container mt-5"><h2>Contact Us</h2><p>For inquiries, please email us at contact@collectiverse.com or call (123) 456-7890.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 