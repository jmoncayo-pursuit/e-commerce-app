import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, error, isLoading, clearError } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const countdownRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  // Handle redirect after successful registration
  useEffect(() => {
    if (isSuccess) {
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            const from = location.state?.from?.pathname || '/profile';
            navigate(from, { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [isSuccess, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
    if (validationError) setValidationError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register({
        email: formData.email,
        password: formData.password
      });
      setIsSuccess(true);
      setCountdown(3);
    } catch (error) {
      let message = 'Registration failed.';
      if (error && error.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (typeof parsed === 'object') {
            if (Array.isArray(parsed)) {
              message = parsed.join(' ');
            } else {
              message = Object.values(parsed).join(' ');
            }
          } else {
            message = String(parsed);
          }
        } catch {
          message = error.message;
        }
      }
      setValidationError(message);
      console.error('Registration failed:', error);
    }
  };

  const handleManualRedirect = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    const from = location.state?.from?.pathname || '/profile';
    navigate(from, { replace: true });
  };

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card success">
          <h1>Account Created Successfully!</h1>
          <p>Welcome to Collectiverse!</p>
          <p>Redirecting you to your profile in {countdown} seconds...</p>
          <button 
            className="auth-button" 
            onClick={handleManualRedirect}
          >
            Go to Profile Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join our community of collectors</p>

        {(error || validationError) && (
          <div className="auth-error">{error || validationError}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 