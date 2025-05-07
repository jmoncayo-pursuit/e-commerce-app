import { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  // Sample products data
  const products = [
    {
      id: 1,
      title: 'Rare Spider-Man Comic',
      price: 299.99,
      category: 'Comics',
      condition: 'Mint',
      image: '/images/spiderman-comic.jpg',
    },
    {
      id: 2,
      title: 'Vintage Nintendo Console',
      price: 199.99,
      category: 'Gaming',
      condition: 'Good',
      image: '/images/nintendo-console.jpg',
    },
    {
      id: 3,
      title: 'Limited Edition Action Figure',
      price: 149.99,
      category: 'Action Figures',
      condition: 'New',
      image: '/images/action-figure.jpg',
    },
    {
      id: 4,
      title: 'Batman #1 Reprint',
      price: 89.99,
      category: 'Comics',
      condition: 'Very Good',
      image: '/images/batman-comic.jpg',
    },
    {
      id: 5,
      title: 'Super Mario Bros. Cartridge',
      price: 49.99,
      category: 'Gaming',
      condition: 'Good',
      image: '/images/mario-cartridge.jpg',
    },
  ];

  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');

  const categories = ['All', 'Comics', 'Gaming', 'Action Figures'];
  const conditions = ['All', 'New', 'Mint', 'Very Good', 'Good'];

  const filteredProducts = products.filter((product) => {
    if (category !== 'All' && product.category !== category) return false;
    if (condition !== 'All' && product.condition !== condition) return false;
    return true;
  });

  return (
    <div className="container">
      <h1>All Products</h1>
      
      <div className="filters">
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="condition" className="form-label">Condition</label>
          <select
            id="condition"
            className="form-input"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="card product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-condition">{product.condition}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products; 