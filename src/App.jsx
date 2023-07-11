import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Category from './pages/category/category.jsx';
import Product from './pages/products/product.jsx';
import Sales from './pages/sales.jsx';
import Dashboard from './pages/dashboard.jsx';
import User from './pages/user.jsx';
import Sidebar from './components/sidebar.jsx';
import './App.css';
import Navbar from './components/navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Suppliers from './pages/suppliers.jsx';
import Addcategory from "./pages/category/addcategory.jsx";
import Addproducts from "./pages/products/addproduct.jsx";
import { apiUrl, apiKey, apiPassword } from './api.js';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    window.location.href = "/";
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <div className="sidebar-container">
                <Sidebar />
                <div className="navbar-container">
                  <Navbar handleLogout={handleLogout} />
                  <div>
                    <Routes>
                      <Route 
                        path="/" 
                        element={
                          <Dashboard 
                          apiUrl={`${apiUrl}/atum/dashboard`}
                          apiKey={apiKey}
                          apiPassword={apiPassword}
                          />} />
                      <Route path="/user" element={<User />} />
                      <Route
                        path="/products"
                        element={
                          <Product
                            apiUrl={`${apiUrl}/products`}
                            apiKey={apiKey}
                            apiPassword={apiPassword}
                          />
                        }
                      />
                      <Route path="/addproducts" 
                      element={<Addproducts 
                        apiUrl={`${apiUrl}/products`}
                        apiKey={apiKey}
                        apiPassword={apiPassword} />} />
                      <Route
                        path="/category"
                        element={
                          <Category
                            apiUrl={`${apiUrl}/products/categories`}
                            apiKey={apiKey}
                            apiPassword={apiPassword}
                          />
                        }
                      />
                      <Route path="/addcategory" 
                      element={<Addcategory 
                        apiUrl={`${apiUrl}/products/categories`}
                        apiKey={apiKey}
                        apiPassword={apiPassword} />} />
                       <Route
                        path="/sales"
                        element={
                          <Sales
                          apiUrl={`${apiUrl}/atum/dashboard/sales`}
                            apiKey={apiKey}
                            apiPassword={apiPassword}
                          />
                        }
                      />
                      <Route path="/suppliers" 
                      element={<Suppliers 
                        apiUrl={`${apiUrl}/atum/suppliers`}
                        apiKey={apiKey}
                        apiPassword={apiPassword} />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <LoginPage handleLogin={handleLogin} />
            )
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
