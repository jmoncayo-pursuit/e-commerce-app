import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleFooter = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <footer className={`footer ${isCollapsed ? 'footer-collapsed' : ''}`}>
      <button className="footer-toggle" onClick={toggleFooter} aria-label="Toggle footer">
        <span className="toggle-icon">−</span>
      </button>
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Collectiverse</h3>
              <p>Your one-stop shop for collectibles, comics, and gaming treasures.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/products?category=comics">Comics</Link></li>
                <li><Link to="/products?category=action-figures">Action Figures</Link></li>
                <li><Link to="/products?category=retro-games">Retro Games</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Collectiverse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 