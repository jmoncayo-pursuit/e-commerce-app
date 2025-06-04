import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';
import './ProductEdit.css';

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

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    brand: '',
    model: '',
    year: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getById(id);
      const product = response.data;
      
      // Check if user is the seller
      if (product.seller?.id !== user?.id) {
        toast.error('You are not authorized to edit this product');
        navigate('/products');
        return;
      }

      setForm({
        title: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
        brand: product.brand || '',
        model: product.model || '',
        year: product.year || '',
        imageUrl: product.imageUrl || '',
      });
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch product details');
      navigate('/products');
    }
  };

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

    setSaving(true);
    try {
      await productService.update(id, {
        ...form,
        price: parseFloat(form.price),
        year: form.year ? parseInt(form.year) : undefined,
      });
      toast.success('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="product-edit-container"><h2>You must be logged in to edit a product.</h2></div>;
  }

  if (loading) {
    return <div className="product-edit-container"><h2>Loading product details...</h2></div>;
  }

  return (
    <div className="product-edit-container">
      <h2>Edit Product</h2>
      <form className="product-edit-form" onSubmit={handleSubmit}>
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

        <div className="form-actions">
          <button type="button" onClick={() => navigate(`/products/${id}`)} className="cancel-button">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="submit-button">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit; 