import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: 1,
    title: 'Rare Spider-Man Comic',
    price: 299.99,
    category: 'Comics',
    condition: 'Mint',
    description: 'A rare first edition Spider-Man comic in mint condition. This collectible piece is a must-have for any serious comic book collector.',
    images: [
      '/images/spiderman-comic.jpg',
      '/images/spiderman-comic-2.jpg',
      '/images/spiderman-comic-3.jpg',
    ],
    seller: {
      name: 'ComicCollector123',
      rating: 4.8,
      reviews: 156,
    },
  };

  const handleAddToCart = () => {
    // In a real app, this would dispatch an action to add the item to the cart
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-images">
          <img src={product.images[0]} alt={product.title} className="main-image" />
          <div className="thumbnail-grid">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - view ${index + 1}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <div className="product-meta">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
          </div>

          <div className="seller-info">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {product.seller.name}</p>
            <p><strong>Rating:</strong> {product.seller.rating} ⭐ ({product.seller.reviews} reviews)</p>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="add-to-cart">
            <div className="quantity-selector">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="form-input"
              />
            </div>
            <button onClick={handleAddToCart} className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 