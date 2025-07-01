import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import './ProductCreate.css';

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

const ProductCreate = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: categories[0],
    condition: conditions[0],
    brand: '',
    model: '',
    year: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <div className="product-create-container"><h2>You must be logged in to create a product.</h2></div>;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (form.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!form.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!form.category) {
      newErrors.category = 'Category is required';
    }

    if (!form.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (form.year && (isNaN(form.year) || parseInt(form.year) < 1900 || parseInt(form.year) > new Date().getFullYear())) {
      newErrors.year = 'Year must be between 1900 and current year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      await productService.create({
        ...form,
        price: parseFloat(form.price),
        year: form.year ? parseInt(form.year) : undefined,
      });
      toast.success('Product created successfully!');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-create-container">
      <h2>Create a New Product</h2>
      <form className="product-create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className={errors.condition ? 'error' : ''}
          >
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond.charAt(0).toUpperCase() + cond.slice(1)}
              </option>
            ))}
          </select>
          {errors.condition && <span className="error-message">{errors.condition}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            className={errors.year ? 'error' : ''}
          />
          {errors.year && <span className="error-message">{errors.year}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate; 