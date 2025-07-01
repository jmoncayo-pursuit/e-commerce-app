import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock orders data (in a real app, this would come from an API)
  const mockOrders = [
    {
      id: '1001',
      date: '2023-09-15',
      total: 129.99,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Vintage Comic Book', price: 89.99, quantity: 1 },
        { id: 2, name: 'Collectible Action Figure', price: 40.00, quantity: 1 }
      ]
    },
    {
      id: '1002',
      date: '2023-10-05',
      total: 75.50,
      status: 'Processing',
      items: [
        { id: 3, name: 'Limited Edition Poster', price: 25.50, quantity: 1 },
        { id: 4, name: 'Trading Card Set', price: 50.00, quantity: 1 }
      ]
    }
  ];
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/orders', message: 'Please log in to view your orders' } });
      return;
    }
    
    // Simulate API call with setTimeout
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [isAuthenticated, navigate]);
  
  // Show success message if redirected from checkout
  const [message, setMessage] = useState(location.state?.message || '');
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      
      {message && (
        <div className="order-success-message">
          <p>{message}</p>
        </div>
      )}
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
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
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 