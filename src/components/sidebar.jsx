import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false);
  const [categorySubMenuOpen, setCategorySubMenuOpen] = useState(false);

  const toggleProductSubMenu = () => {
    setProductSubMenuOpen(!productSubMenuOpen);
  };

  const toggleCategorySubMenu = () => {
    setCategorySubMenuOpen(!categorySubMenuOpen);
  };

  const closeSubMenus = () => {
    setProductSubMenuOpen(false);
    setCategorySubMenuOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="inventory-box">
        <p className="logo-text">
          <i className="glyphicon glyphicon-list-alt"></i>
          <span id="inventory">INVENTORY</span>
        </p>
      </div>
      <ul className="outer-sidebar">
        <li>
          <Link to="/">
            <i className="glyphicon glyphicon-home"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <div className ="sidebar-submenu" onClick={toggleProductSubMenu}>
            <i className="glyphicon glyphicon-th-large"></i>
            <span>Products</span>
          </div>
          {productSubMenuOpen && (
            <ul className="sidebar-innersubmenu">
              <li>
                <Link to="/products" onClick={closeSubMenus}>
                  <span><i className="glyphicon glyphicon-menu-right"></i>
                  Manage Products</span>
                </Link>
              </li>
              <li>
                <Link to="/addproducts" onClick={closeSubMenus}>
                  <span><i className="glyphicon glyphicon-menu-right"></i>
                  Add Products</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div className ="sidebar-submenu" onClick={toggleCategorySubMenu}>
            <i className="glyphicon glyphicon-indent-left"></i>
            <span>Category</span>
          </div>
          {categorySubMenuOpen && (
            <ul className="sidebar-innersubmenu">
              <li>
                <Link to="/category" onClick={closeSubMenus}>
                  <span><i className="glyphicon glyphicon-menu-right"></i>
                  Manage Category</span>
                </Link>
              </li>
              <li>
                <Link to="/addcategory" onClick={closeSubMenus}>
                  <span><i className="glyphicon glyphicon-menu-right"></i>
                  Add Category</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/sales" onClick={closeSubMenus}>
            <i className="glyphicon glyphicon-credit-card"></i>
            <span>Sales</span>
          </Link>
        </li>
        <li>
          <Link to="/user" onClick={closeSubMenus}>
            <i className="glyphicon glyphicon-user"></i>
            <span>User Management</span>
          </Link>
        </li>
        <li>
          <Link to="/suppliers">
            <i className="glyphion fas fa-car"></i>
            <span>Suppliers</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
