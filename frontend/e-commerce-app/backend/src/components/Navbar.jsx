import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };
  const handleDropdownToggle = () => setDropdownOpen((open) => !open);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          Collectiverse
        </Link>
        <form className="navbar-search" onSubmit={handleSearchSubmit} role="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search collectibles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search collectibles"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <span className="search-icon">🔍</span>
          </button>
        </form>
        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={handleMenuToggle}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <Link to="/products" className="navbar-link" onClick={handleLinkClick}>Products</Link>
          <Link to="/cart" className="navbar-link navbar-cart" onClick={handleLinkClick}>
            <span className="cart-icon">🛒</span>
            {/* Cart count can be added here if needed */}
          </Link>
          {/* Desktop user dropdown */}
          <div className="navbar-user-dropdown desktop-only">
            <button
              className="navbar-link user-btn"
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span className="user-icon">👤</span>
              {user ? user.username || "Account" : "Account"}
              <span className="dropdown-arrow">▼</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="dropdown-link" onClick={handleLinkClick}>Profile</Link>
                    <button className="dropdown-link" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-link" onClick={handleLinkClick}>Login</Link>
                    <Link to="/register" className="dropdown-link" onClick={handleLinkClick}>Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
          {/* Mobile user links */}
          <div className="mobile-only">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="navbar-link" onClick={handleLinkClick}>Profile</Link>
                <button onClick={handleLogout} className="navbar-link">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link" onClick={handleLinkClick}>Login</Link>
                <Link to="/register" className="navbar-link" onClick={handleLinkClick}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 