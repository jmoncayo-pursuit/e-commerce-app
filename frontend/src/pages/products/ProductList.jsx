import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../../stores/productStore';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import { useAuthStore } from '../../stores/authStore';
import { productService } from '../../services/api';
import './ProductList.css';

const categories = [
  'comics',
  'figures',
  'cards',
  'posters',
  'retro-games',
];

const conditions = [
  'mint',
  'near-mint',
  'excellent',
  'very-good',
  'good',
];

const ProductList = () => {
  const { products, loading, error, fetchProducts, filterProducts, sortProducts, filters, setFilters } = useProductStore();
  const { isAuthenticated } = useAuthStore();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

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
      <div className="product-list-header">
        <h2>Collectibles</h2>
        {isAuthenticated && (
          <Link to="/products/create" className="create-product-button">
            Create Product
          </Link>
        )}
      </div>

      <button 
        className="filter-toggle-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filters-section">
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="filter-select"
            >
              <option value="">All Conditions</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </option>
              ))}
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
                <span className="seller-name">{product.seller?.name || 'Anonymous Seller'}</span>
                <span className="seller-rating">★ {product.seller?.rating || 'N/A'}</span>
              </div>
              <div className="product-location">
                <span>📍 {product.location || 'Location not specified'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductList; 