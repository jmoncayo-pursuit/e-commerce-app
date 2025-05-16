import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const { user, isAuthenticated, logout } = useAuthStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    logout: state.logout
  }));
  
  const cartItemCount = useCartStore(state => state.getItemCount());

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/', { replace: true });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">Collectiverse</span>
          </Link>

          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search collectibles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>

            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  className="user-menu-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                  aria-controls="user-dropdown"
                >
                  <span className="user-avatar-row">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="user-avatar"
                      />
                    ) : (
                      <span className="user-avatar-text" style={{ backgroundColor: '#60a5fa', color: 'white', padding: '5px', borderRadius: '50%' }}>
                        {user?.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
                      </span>
                    )}
                    <span className="user-menu-username">{user?.username}</span>
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div id="user-dropdown" className="user-dropdown">
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-button">
                  Login
                </Link>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="hamburger-line" aria-hidden="true" style={{ display: 'block', width: 24, height: 2, background: '#e5e5e5', margin: '5px 0', borderRadius: 2, transition: 'all 0.3s', transform: isMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
            <span className="hamburger-line" aria-hidden="true" style={{ display: 'block', width: 24, height: 2, background: '#e5e5e5', margin: '5px 0', borderRadius: 2, transition: 'all 0.3s', opacity: isMenuOpen ? 0 : 1 }}></span>
            <span className="hamburger-line" aria-hidden="true" style={{ display: 'block', width: 24, height: 2, background: '#e5e5e5', margin: '5px 0', borderRadius: 2, transition: 'all 0.3s', transform: isMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="mobile-menu">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="cart-icon">🛒</span> Cart
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className="mobile-logout-btn"
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 