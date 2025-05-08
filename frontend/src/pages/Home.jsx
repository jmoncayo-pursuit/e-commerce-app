import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import './Home.css';

const Home = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Collectiverse</h1>
          <p className="hero-subtitle">Your one-stop shop for all things collectible</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-secondary">Join Now</Link>
            )}
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Categories</h2>
        <div className="category-grid">
          <div className="category-card" style={{ background: 'var(--gradient-comic)' }}>
            <h3>Comic Books</h3>
            <p>Explore our collection of rare and vintage comics</p>
          </div>
          <div className="category-card" style={{ background: 'var(--gradient-action)' }}>
            <h3>Action Figures</h3>
            <p>Find your favorite characters in our action figure collection</p>
          </div>
          <div className="category-card" style={{ background: 'var(--gradient-retro)' }}>
            <h3>Retro Games</h3>
            <p>Discover classic games and gaming memorabilia</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 