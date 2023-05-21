import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/category.jsx';
import Product from './pages/product.jsx';
import Dashboard from './pages/dashboard.jsx';
import Sidebar from './components/sidebar.jsx';
import './App.css';
import Navbar from './components/navbar.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/products/*"
                element={
                  <Product
                    apiUrl="https://jaipurprint.in/wp-json/wc/v3/products"
                    apiKey="ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b"
                    apiPassword="cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41"
                  />
                }
              />
              <Route
                path="/category/*"
                element={
                  <Category
                    apiUrl="https://jaipurprint.in/wp-json/wc/v3/products/categories"
                    apiKey="ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b"
                    apiPassword="cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41"
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
