import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <footer className={`footer${collapsed ? ' collapsed' : ''}`}>
      <div className="footer-dash-container">
        <button
          className="footer-minimize-dash"
          aria-label={collapsed ? 'Expand footer' : 'Minimize footer'}
          onClick={() => setCollapsed((c) => !c)}
          tabIndex={0}
        ></button>
      </div>
      {!collapsed && (
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Collectiverse</h3>
              <p>Your one-stop destination for premium collectibles, comics, action figures, and retro gaming memorabilia.</p>
            </div>
            <div className="footer-section">
              <h3>Collections</h3>
              <ul>
                <li><Link to="/products?category=comics">Comic Books</Link></li>
                <li><Link to="/products?category=figures">Action Figures</Link></li>
                <li><Link to="/products?category=retro">Retro Games</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Account</h3>
              <ul>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/cart">Shopping Cart</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Help & Info</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Collectiverse. All rights reserved.</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer; 