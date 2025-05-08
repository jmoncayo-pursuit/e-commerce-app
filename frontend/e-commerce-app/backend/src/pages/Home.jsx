import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../stores/useStore';

const Home = () => {
  const { products, setProducts } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Rare Collectibles in the Collectiverse</h1>
          <p className="hero-subtitle">Your ultimate destination for premium comics, action figures, and retro games.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary hero-btn">Explore Collections</Link>
            <Link to="/signup" className="btn btn-outline hero-btn">Join Collectiverse</Link>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <Link to={`/products/${product.id}`} className="btn btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Browse Categories</h2>
        <div className="category-grid">
          <div className="category-card" style={{ background: 'var(--gradient-comic)' }}>
            <h3>Comics</h3>
            <p>Vintage and modern comics</p>
          </div>
          <div className="category-card" style={{ background: 'var(--gradient-action)' }}>
            <h3>Action Figures</h3>
            <p>Collectible figures</p>
          </div>
          <div className="category-card" style={{ background: 'var(--gradient-retro)' }}>
            <h3>Retro Games</h3>
            <p>Classic gaming systems</p>
          </div>
        </div>
      </section>

      <section className="page-placeholder">
        <img src="/collectiverse-icon.png" alt="Collectiverse Icon" className="section-icon" />
        <h2>Home Page</h2>
        <p>This is the Home page. Add your hero, categories, and featured collectibles here.</p>
      </section>
    </div>
  );
};

export default Home; 