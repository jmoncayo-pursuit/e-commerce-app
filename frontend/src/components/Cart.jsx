import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to checkout');
      navigate('/login');
      return;
    }

    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {cart.items.map(item => (
              <div
                key={item.id}
                className="flex items-center p-6 border-b last:border-b-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-l-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-12 h-8 flex items-center justify-center border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-r-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-600 mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 mt-6"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <button
              className="w-full text-gray-500 hover:text-gray-600 py-3 px-6 rounded-lg font-medium mt-4"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 