import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ImageUpload from "./components/ImageUpload";
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <h1>Test Firebase Image Upload</h1>
        <ImageUpload />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as we create them */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
