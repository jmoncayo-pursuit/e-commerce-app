import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, isLoading, clearError, isAuthenticated } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const countdownRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Effect to handle navigation after successful login
  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            // If we're already on the profile page, go to home
            if (location.pathname === '/profile') {
              navigate('/', { replace: true });
            } 
            // If we have a from path in location state, go there
            else if (location.state?.from?.pathname) {
              navigate(location.state.from.pathname, { replace: true });
            } 
            // Otherwise go to profile
            else {
              navigate('/profile', { replace: true });
            }
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
  }, [isSuccess, isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setIsSuccess(true);
      setCountdown(3);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleManualRedirect = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    if (location.pathname === '/profile') {
      navigate('/', { replace: true });
    } else if (location.state?.from?.pathname) {
      navigate(location.state.from.pathname, { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card success">
          <h1>Welcome Back!</h1>
          <p>Successfully signed in</p>
          <p>Redirecting you in {countdown} seconds...</p>
          <button 
            className="auth-button" 
            onClick={handleManualRedirect}
          >
            Continue Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

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

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 