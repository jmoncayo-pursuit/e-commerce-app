import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="product-card">
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.imageUrl || 'https://via.placeholder.com/400'}
              alt={product.name}
            />
          </div>
          <div className="product-info">
            <div className="product-category">{product.category}</div>
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price">${product.price}</div>
            <button
              className="add-to-cart-button"
              onClick={() => {
                // TODO: Implement add to cart functionality
                console.log('Add to cart:', product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 