import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../stores/useStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement actual checkout logic with backend
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearCart();
      navigate('/profile');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <p>Add some items to your cart before checking out.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="page-placeholder">
      <h2>Checkout Page</h2>
      <p>This is the Checkout page. Shipping, payment, and order summary will go here.</p>
    </section>
  );
};

export default Checkout; 