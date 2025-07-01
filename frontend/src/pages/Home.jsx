import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../stores/productStore';
import './Home.css';

const FALLBACK_IMAGE = '/images/collectiverse-icon.png';

// Category images
const CATEGORY_IMAGES = {
  comics: '/images/comics.jpg',
  figures: '/images/action-figures.jpg',
  cards: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=800&q=80', // Pokémon trading cards
  posters: '/images/posters.jpg',
  'retro-games': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80' // arcade video game machines
};

const Home = () => {
  const { products, isLoading } = useProductStore(state => ({
    products: state.products,
    isLoading: state.isLoading
  }));

  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    const video = document.getElementById('collectiverse-bg-video');
    if (video) video.playbackRate = 0.7;
  }, []);

  return (
    <div className="background-video-container">
      <video
        className="background-video"
        src="/images/Collectiverse Generated video 1.mp4"
        autoPlay
        loop
        muted
        playsInline
        id="collectiverse-bg-video"
      />
      <div className="background-overlay"></div>
      <div className="home">
        <section className="hero" style={{ 
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          overflow: 'visible',
          position: 'relative',
          minHeight: 'unset',
          height: 'auto'
        }}>
          <div className="hero-content">
            <h1>Welcome to Collectiverse</h1>
            <p>Your ultimate destination for rare collectibles and memorabilia</p>
            <Link to="/products" className="cta-button">
              Browse Collection
            </Link>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-header">
            <h2>Popular Categories</h2>
          </div>
          <div className="categories-grid">
            <Link to="/products?category=comics" className="category-card">
              <div className="category-image">
                <img src="/images/comics.jpg" alt="Comics" />
              </div>
              <h3>Comics</h3>
            </Link>
            <Link to="/products?category=figures" className="category-card">
              <div className="category-image">
                <img src="/images/action-figures.jpg" alt="Action Figures" />
              </div>
              <h3>Action Figures</h3>
            </Link>
            <Link to="/products?category=cards" className="category-card">
              <div className="category-image">
                <img src="/images/trading-cards.jpg" alt="Trading Cards" />
              </div>
              <h3>Trading Cards</h3>
            </Link>
            <Link to="/products?category=posters" className="category-card">
              <div className="category-image">
                <img src="/images/posters.jpg" alt="Posters" />
              </div>
              <h3>Posters</h3>
            </Link>
            <Link to="/products?category=retro-games" className="category-card">
              <div className="category-image">
                <img src="/images/retro-games.jpg" alt="Retro Games" />
              </div>
              <h3>Retro Games</h3>
            </Link>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-header">
            <h2>Featured Collectibles</h2>
            <Link to="/products" className="view-all">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="loading">Loading featured products...</div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((product, idx) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="product-card"
                >
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-category">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Start Your Collection Today</h2>
            <p>Join our community of collectors and discover rare treasures</p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary">
                Sign Up
              </Link>
              <Link to="/products" className="cta-button secondary">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 