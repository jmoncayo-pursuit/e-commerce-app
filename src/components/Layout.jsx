import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav-container">
          <Link to="/" className="logo">Collectiverse</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/comics" className="nav-link">Comics</Link>
            <Link to="/action-figures" className="nav-link">Action Figures</Link>
            <Link to="/retro-games" className="nav-link">Retro Games</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </nav>
      </header>

      <main className="container">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Collectiverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 