import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, clearCart } = useCartStore();
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const [shippingResponse, billingResponse] = await Promise.all([
        fetch('http://localhost:8080/api/checkout/addresses?type=SHIPPING', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('http://localhost:8080/api/checkout/addresses?type=BILLING', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (shippingResponse.ok && billingResponse.ok) {
        const shippingData = await shippingResponse.json();
        const billingData = await billingResponse.json();
        setShippingAddresses(shippingData);
        setBillingAddresses(billingData);

        // Set default addresses if available
        const defaultShipping = shippingData.find(addr => addr.isDefault);
        const defaultBilling = billingData.find(addr => addr.isDefault);
        if (defaultShipping) setSelectedShippingAddress(defaultShipping.id);
        if (defaultBilling) setSelectedBillingAddress(defaultBilling.id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    }
  };

  const handleCheckout = async () => {
    if (!selectedShippingAddress || !selectedBillingAddress) {
      toast.error('Please select both shipping and billing addresses');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          shippingAddressId: selectedShippingAddress,
          billingAddressId: selectedBillingAddress
        })
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        toast.success('Order placed successfully!');
        navigate(`/orders/${order.id}`);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          {shippingAddresses.length > 0 ? (
            <div className="space-y-4">
              {shippingAddresses.map(address => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedShippingAddress === address.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedShippingAddress(address.id)}
                >
                  <p className="font-medium">{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No shipping addresses found</p>
          )}
          <button
            className="mt-4 text-blue-500 hover:text-blue-600"
            onClick={() => navigate('/profile?tab=addresses')}
          >
            Add New Address
          </button>
        </div>

        {/* Billing Address */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
          {billingAddresses.length > 0 ? (
            <div className="space-y-4">
              {billingAddresses.map(address => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedBillingAddress === address.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedBillingAddress(address.id)}
                >
                  <p className="font-medium">{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No billing addresses found</p>
          )}
          <button
            className="mt-4 text-blue-500 hover:text-blue-600"
            onClick={() => navigate('/profile?tab=addresses')}
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.items.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center font-bold">
              <p>Total</p>
              <p>${cart.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8">
        <button
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isLoading || !selectedShippingAddress || !selectedBillingAddress}
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout; 