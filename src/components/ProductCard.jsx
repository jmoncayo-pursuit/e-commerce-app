import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, price, category, imageUrl, condition } = product;

  const getBadgeClass = () => {
    switch (category.toLowerCase()) {
      case 'comic':
        return 'badge-comic';
      case 'action figure':
        return 'badge-action';
      case 'retro game':
        return 'badge-retro';
      default:
        return '';
    }
  };

  return (
    <div className="product-card glow-effect">
      <div className="product-badge">{condition}</div>
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        <div className="product-price">${price.toFixed(2)}</div>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard; 