import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts } = useProductStore();
  const { addItem } = useCartStore();
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
      }
  }, [fetchProducts, products.length]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error">Product not found</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image" style={{
            backgroundImage: "url('/images/hero-background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '400px',
            position: 'relative'
          }}>
            <ImageWithFallback
              src={product.images[0]?.imageUrl}
              alt={product.name}
              className="product-image"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div className="thumbnail-grid">
            {product.images.map((image, index) => (
              <div key={image.id} className="thumbnail">
                <ImageWithFallback
                  src={image.imageUrl}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
          <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-meta">
            <span className="product-condition">{product.condition}</span>
            <span className="product-year">{product.year}</span>
          </div>
            <p className="product-description">{product.description}</p>
          
          <div className="product-price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Seller Information */}
          <div className="seller-section">
            <h2>Seller Information</h2>
            <div className="seller-info">
              <div className="seller-profile">
                {product.seller.profileImageUrl ? (
                  <img 
                    src={product.seller.profileImageUrl} 
                    alt={product.seller.name}
                    className="seller-avatar"
                  />
                ) : (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    backgroundColor: '#60a5fa',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    borderRadius: '50%'
                  }}>
                    {(product.seller.name ? product.seller.name.substring(0, 2) : 'U').toUpperCase()}
                  </span>
                )}
                <div className="seller-details">
                  <h3>{product.seller.name}</h3>
                  <div className="seller-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{product.seller.rating}</span>
                  </div>
                  <p>Member since {product.seller.memberSince}</p>
                </div>
              </div>
              <div className="seller-stats">
                <div className="stat">
                  <span className="stat-label">Response Time</span>
                  <span className="stat-value">{product.seller.responseTime}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Sales</span>
                  <span className="stat-value">{product.seller.totalSales}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="shipping-section">
            <h2>Shipping Information</h2>
            <div className="shipping-details">
              <div className="shipping-method">
                <span className="method-label">Method:</span>
                <span className="method-value">{product.shipping?.method || 'Standard Shipping'}</span>
              </div>
              <div className="shipping-price">
                <span className="price-label">Shipping Cost:</span>
                <span className="price-value">${(product.shipping?.price || 5.99).toFixed(2)}</span>
              </div>
              <div className="shipping-time">
                <span className="time-label">Estimated Delivery:</span>
                <span className="time-value">{product.shipping?.estimatedDelivery || '3-5 business days'}</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details-section">
            <h2>Product Details</h2>
            <div className="details-grid">
              {Object.entries(product.details || {}).map(([key, value]) => (
                <div key={key} className="detail-item">
                  <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 