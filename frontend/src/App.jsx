import React, { useEffect } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import SearchResults from './pages/search/SearchResults';
import Cart from './pages/cart/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import Orders from './pages/orders/Orders';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './stores/authStore';
import './App.css';

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    try {
    initialize();
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }, [initialize]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App; 