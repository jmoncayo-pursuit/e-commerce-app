import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import './Layout.css';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default Layout; 