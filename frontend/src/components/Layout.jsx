import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';

const Layout = () => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout; 