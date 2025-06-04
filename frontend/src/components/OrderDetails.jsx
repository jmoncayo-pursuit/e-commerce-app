import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/checkout/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        toast.error('Failed to load order details');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      navigate('/orders');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order Not Found</h1>
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {order.status}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Total</h2>
          <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-b-0">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div>
            <p className="font-medium">{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          <div>
            <p className="font-medium">{order.billingAddress.street}</p>
            <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
            <p>{order.billingAddress.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 