import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import './Cart.css';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart', message: 'Please log in to checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link to="/products" className="shop-button">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-items">
        <div className="cart-header">
          <span className="product-col">Product</span>
          <span className="price-col">Price</span>
          <span className="quantity-col">Quantity</span>
          <span className="total-col">Total</span>
          <span className="action-col">Action</span>
        </div>
        
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="product-col">
              <img 
                src={item.image || 'https://via.placeholder.com/80'} 
                alt={item.name} 
                className="item-image"
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
              </div>
            </div>
            
            <div className="price-col">${item.price.toFixed(2)}</div>
            
            <div className="quantity-col">
              <div className="quantity-control">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="quantity-input"
                />
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="total-col">${(item.price * item.quantity).toFixed(2)}</div>
            
            <div className="action-col">
              <button 
                onClick={() => removeItem(item.id)}
                className="remove-btn"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        
        <div className="cart-totals">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleCheckout} 
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 