import React from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: '1',
      date: '2024-03-15',
      total: 1800,
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Deadpool #1 (1997)',
          price: 1800,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1612036782180-6f44e830872e?w=800&auto=format&fit=crop&q=60'
        }
      ]
    },
    {
      id: '2',
      date: '2024-03-10',
      total: 2400,
      status: 'Shipped',
      items: [
        {
          id: '2',
          name: 'Batman: The Dark Knight Returns',
          price: 1200,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1612036782180-6f44e830872e?w=800&auto=format&fit=crop&q=60'
        }
      ]
    }
  ];

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="browse-button">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
                <button className="track-order-button">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 