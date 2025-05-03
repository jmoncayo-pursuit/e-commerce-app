import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          Collectiverse
        </Link>
        <div className="nav-links">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 