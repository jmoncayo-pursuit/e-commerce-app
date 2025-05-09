import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchStore from '../../stores/searchStore';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const {
    searchResults,
    filters,
    sortBy,
    isLoading,
    error,
    setSearchQuery,
    setFilters,
    setSortBy,
    clearFilters,
    searchProducts
  } = useSearchStore();

  useEffect(() => {
    setSearchQuery(query);
    searchProducts(query, filters, sortBy);
  }, [query, filters, sortBy, setSearchQuery, searchProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ [name]: value });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      priceRange: {
        ...filters.priceRange,
        [name]: parseInt(value)
      }
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="search-results-container">
        <div className="loading">Searching products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results for "{query}"</h1>
        <p>{searchResults.length} products found</p>
      </div>

      <div className="search-content">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2>Filters</h2>
            <button onClick={clearFilters} className="clear-filters">
              Clear All
            </button>
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="comics">Comics</option>
              <option value="cards">Trading Cards</option>
              <option value="figures">Action Figures</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Condition</h3>
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
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="number"
                name="min"
                value={filters.priceRange.min}
                onChange={handlePriceRangeChange}
                placeholder="Min"
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                name="max"
                value={filters.priceRange.max}
                onChange={handlePriceRangeChange}
                placeholder="Max"
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Year</h3>
            <input
              type="number"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              placeholder="Enter year"
              className="year-input"
            />
          </div>
        </aside>

        <main className="results-main">
          <div className="results-header">
            <div className="sort-options">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="results-grid">
            {searchResults.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.images[0]?.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-category">{product.category}</p>
                </div>
              </div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="no-results">
              <p>No products found matching your search criteria.</p>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults; 