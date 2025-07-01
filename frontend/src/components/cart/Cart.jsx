import React from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';
import './Cart.css';

const Cart = () => {
  const {
    items,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart ({getTotalItems()} items)</h2>
          <button className="close-button" onClick={toggleCart}>
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-shopping" onClick={toggleCart}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">${item.price}</p>
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="clear-cart-button" onClick={clearCart}>
                  Clear Cart
                </button>
                <Link to="/checkout" className="checkout-button" onClick={toggleCart}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 