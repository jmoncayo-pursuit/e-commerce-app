import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setStatus({
      type: 'success',
      message: 'Thank you for your message! We will get back to you soon.',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Have questions or need assistance? We're here to help! Reach out to us 
          through the form below or use our contact information.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-section">
              <h2>Get in Touch</h2>
              <div className="info-item">
                <h3>Email</h3>
                <p>contact@collectiverse.com</p>
              </div>
              <div className="info-item">
                <h3>Phone</h3>
                <p>(123) 456-7890</p>
              </div>
              <div className="info-item">
                <h3>Address</h3>
                <p>123 Collectors Lane<br />New York, NY 10001</p>
              </div>
            </div>

            <div className="info-section">
              <h2>Business Hours</h2>
              <div className="info-item">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>

              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 