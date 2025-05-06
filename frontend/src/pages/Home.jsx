import React from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Sample data - in a real app, this would come from an API
  const featuredProducts = [
    {
      id: 1,
      title: 'Spider-Man #1 (1963)',
      price: 999.99,
      category: 'Comic',
      condition: 'Mint',
      imageUrl: 'https://via.placeholder.com/300x400?text=Spider-Man+Comic'
    },
    {
      id: 2,
      title: 'Star Wars Darth Vader Action Figure',
      price: 149.99,
      category: 'Action Figure',
      condition: 'New',
      imageUrl: 'https://via.placeholder.com/300x400?text=Darth+Vader'
    },
    {
      id: 3,
      title: 'Super Nintendo Entertainment System',
      price: 199.99,
      category: 'Retro Game',
      condition: 'Used',
      imageUrl: 'https://via.placeholder.com/300x400?text=SNES'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Collectiverse</h1>
        <p>Your one-stop shop for comics, action figures, and retro games</p>
      </section>

      <section className="featured-products">
        <h2>Featured Collectibles</h2>
        <div className="category-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Comics</button>
          <button className="filter-btn">Action Figures</button>
          <button className="filter-btn">Retro Games</button>
        </div>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
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
    </div>
  );
};

export default Home; 