import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
  loading: false,

  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, username, email: userEmail } = response.data;
      set({ token, user: { username, email: userEmail }, isAuthenticated: true, loading: false });
      localStorage.setItem('token', token);
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, username, email } = response.data;
      set({ token, user: { username, email }, isAuthenticated: true, loading: false });
      localStorage.setItem('token', token);
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', loading: false });
    }
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to get user data', loading: false });
    }
  }
}));

export default useAuthStore; 