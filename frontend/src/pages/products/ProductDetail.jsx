import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';
import toast from 'react-hot-toast';
import ImageWithFallback from '../../components/common/ImageWithFallback';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    try {
      await addItem(product, quantity);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleEdit = () => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await productService.delete(id);
      toast.success('Product deleted successfully');
      navigate('/products');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  const isOwner = isAuthenticated && user?.id === product.seller?.id;

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
              src={product.images?.[0]?.imageUrl || product.imageUrl}
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
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-grid">
              {product.images.map((image, index) => (
                <div key={image.id || index} className="thumbnail">
                  <ImageWithFallback
                    src={image.imageUrl}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          )}
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
            {isAuthenticated && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Seller Information */}
          <div className="seller-section">
            <h2>Seller Information</h2>
            <div className="seller-info">
              <div className="seller-profile">
                {product.seller?.profileImageUrl ? (
                  <img 
                    src={product.seller.profileImageUrl} 
                    alt={product.seller.name || 'Seller'}
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
                    {(product.seller?.name ? product.seller.name.substring(0, 2) : 'U').toUpperCase()}
                  </span>
                )}
                <div className="seller-details">
                  <h3>{product.seller?.name || 'Anonymous Seller'}</h3>
                  <div className="seller-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{product.seller?.rating || 'N/A'}</span>
                  </div>
                  <p>Member since {product.seller?.memberSince || 'N/A'}</p>
                </div>
              </div>
              <div className="seller-stats">
                <div className="stat">
                  <span className="stat-label">Response Time</span>
                  <span className="stat-value">{product.seller?.responseTime || 'N/A'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Sales</span>
                  <span className="stat-value">{product.seller?.totalSales || 'N/A'}</span>
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

          {isOwner && (
            <div className="owner-actions">
              <button className="edit-button" onClick={handleEdit}>
                Edit Product
              </button>
              <button
                className="delete-button"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button
                className="confirm-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="cancel-delete"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 