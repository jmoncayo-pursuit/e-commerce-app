import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Sample cart data - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      title: 'Rare Spider-Man Comic',
      price: 299.99,
      quantity: 1,
      image: '/images/spiderman-comic.jpg',
    },
    {
      id: 2,
      productId: 2,
      title: 'Vintage Nintendo Console',
      price: 199.99,
      quantity: 1,
      image: '/images/nintendo-console.jpg',
    },
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="container">
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <Link to={`/products/${item.productId}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    className="form-input"
                  />
                </div>
                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-block">
              Proceed to Checkout
            </button>
            <Link to="/products" className="btn btn-secondary btn-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 