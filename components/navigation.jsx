import React from "react";
import { Link } from "react-router-dom";
import "./product.jsx";
import "./category.jsx";

function Navigation() {
  return (
    <div className="left-pane">
      <ul>
        <li>
          <Link to="/product.jsx">Product Page</Link>
        </li>
        <li>
          <Link to="/category.jsx">Category Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
