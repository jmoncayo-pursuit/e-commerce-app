import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    items,
    loading,
    error,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    fetchCart
  } = useCartStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some collectibles to your cart to see them here!</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Check if cart only has free gift bag
  const hasOnlyGiftBag = items.length === 1 && (
    items[0].productId === 7 || // New structure
    (items[0].product && items[0].product.id === 'free-gift-bag') // Old structure
  );

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
      </div>

      {loading ? (
        <div className="loading">Loading cart...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : items.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.productImage || item.imageUrl || item.product?.imageUrl || '/placeholder-image.jpg'}
                  alt={item.productName || item.name || item.product?.name || 'Product'}
                  className="item-image"
                />
                <div className="item-details">
                  <h3 className="item-name">{item.productName || item.name || item.product?.name}</h3>
                  {item.price > 0 && (
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  )}
                  {item.price === 0 && (
                    <span className="item-price free">FREE!</span>
                  )}
                  <p className="item-condition">Condition: {item.condition || item.product?.condition || 'New'}</p>
                  {!hasOnlyGiftBag && (
                    <div className="item-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.productId || item.product?.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-input">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.productId || item.product?.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <div className="item-total">
                  {item.price > 0 ? (
                    `$${(item.price * item.quantity).toFixed(2)}`
                  ) : (
                    'FREE!'
                  )}
                </div>
                {!hasOnlyGiftBag && typeof (item.productId || item.product?.id) === 'number' && (
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.productId || item.product?.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span className="summary-label">Items ({getTotalItems()}):</span>
              <span className="summary-value">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping:</span>
              <span className="summary-value">Calculated at checkout</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={loading || hasOnlyGiftBag}
            >
              {hasOnlyGiftBag ? 'Free Gift Only' : 'Proceed to Checkout'}
            </button>
            {!hasOnlyGiftBag && (
              <button
                className="clear-cart"
                onClick={clearCart}
                disabled={loading}
              >
                Clear Cart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 