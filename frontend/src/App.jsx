import React from 'react';
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
import './App.css';
// Lazy-load or import these as you implement them
// import ProductList from './pages/products/ProductList';
// import ProductDetail from './pages/products/ProductDetail';
// import Cart from './pages/cart/Cart';
// import Checkout from './pages/checkout/Checkout';
// import Profile from './pages/profile/Profile';

const App = () => (
  <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
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
      </Route>
    </Routes>
  </Router>
);

export default App; 