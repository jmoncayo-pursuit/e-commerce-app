import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../../stores/productStore';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import './ProductList.css';

const ProductList = () => {
  const { products, loading, error, fetchProducts, filterProducts, sortProducts, filters, setFilters } = useProductStore();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const numValue = Math.max(0, parseInt(value) || 0);
    setFilters({
      ...filters,
      priceRange: { ...filters.priceRange, [name]: numValue }
    });
  };

  const filteredProducts = sortProducts(filterProducts());

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading">Loading collectibles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <button 
        className="filter-toggle-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filters-section">
          <div className="filter-controls">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="comics">Comics</option>
              <option value="action-figures">Action Figures</option>
              <option value="retro-games">Retro Games</option>
              <option value="trading-cards">Trading Cards</option>
            </select>

            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Conditions</option>
              <option value="mint">Mint</option>
              <option value="near-mint">Near Mint</option>
              <option value="excellent">Excellent</option>
              <option value="very-good">Very Good</option>
              <option value="good">Good</option>
            </select>

            <div className="price-range">
              <input
                type="number"
                name="min"
                placeholder="Min Price"
                value={filters.priceRange.min}
                onChange={handlePriceRangeChange}
                className="price-input"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                name="max"
                placeholder="Max Price"
                value={filters.priceRange.max}
                onChange={handlePriceRangeChange}
                className="price-input"
                min="0"
              />
            </div>

            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <div className="product-image-container">
              <ImageWithFallback
                src={product.images[0]?.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-condition">{product.condition}</div>
            </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className="product-year">{product.year}</span>
              </div>
              <div className="seller-info">
                <span className="seller-name">{product.seller.name}</span>
                <span className="seller-rating">★ {product.seller.rating}</span>
              </div>
              <div className="product-location">
                <span>📍 {product.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 