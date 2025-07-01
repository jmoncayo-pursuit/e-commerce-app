import React from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../stores/productStore';
import './Home.css';

const FALLBACK_IMAGE = '/images/collectiverse-icon.png';

// Category images
const CATEGORY_IMAGES = {
  comics: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=60', // Stack of comic books
  figures: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=60', // Superhero action figures
  cards: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60', // Trading cards
  posters: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=60' // Wall of posters
};

const Home = () => {
  const { products, isLoading } = useProductStore(state => ({
    products: state.products,
    isLoading: state.isLoading
  }));

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">
      <section className="hero" style={{ backgroundImage: 'url(/images/collectiversebackdrop.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="hero-content">
          <h1>Welcome to Collectiverse</h1>
          <p>Your ultimate destination for rare collectibles and memorabilia</p>
          <Link to="/products" className="cta-button">
            Browse Collection
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
                <div className="product-image">
                  <img
                    src={product.images[0]?.imageUrl || FALLBACK_IMAGE}
                    alt={product.title}
                    onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                  />
                </div>
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

      <section className="categories-section">
        <div className="section-header">
          <h2>Popular Categories</h2>
        </div>
        <div className="categories-grid">
          <Link to="/products?category=comics" className="category-card">
            <div className="category-image">
              <img
                src={CATEGORY_IMAGES.comics}
                alt="Comics"
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              />
            </div>
            <h3>Comics</h3>
          </Link>
          <Link to="/products?category=figures" className="category-card">
            <div className="category-image">
              <img
                src={CATEGORY_IMAGES.figures}
                alt="Action Figures"
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              />
            </div>
            <h3>Action Figures</h3>
          </Link>
          <Link to="/products?category=cards" className="category-card">
            <div className="category-image">
              <img
                src={CATEGORY_IMAGES.cards}
                alt="Trading Cards"
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              />
            </div>
            <h3>Trading Cards</h3>
          </Link>
          <Link to="/products?category=posters" className="category-card">
            <div className="category-image">
              <img
                src={CATEGORY_IMAGES.posters}
                alt="Posters"
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              />
            </div>
            <h3>Posters</h3>
          </Link>
        </div>
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
  );
};

export default Home; 