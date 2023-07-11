import React, { useState, useEffect } from 'react';
import Logo from "/assets/logo.png";

const Navbar = ({ handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout();
  };
  const [username, setusername] = useState("");
  useEffect(() => {
    const user = sessionStorage.getItem('username');
    setusername(user);
  }, []);

  return (
    <nav className="navbar">
      <div className="dropdown">
        <button className="dropdown-toggle" type="button">
          <img id="logo" src={Logo} alt="logo" />
          <span id="logo_name">{username} <i className="caret"></i></span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <i className="glyphicon glyphicon-off" id="off"></i>
            <button id="logout_button" onClick={handleLogoutClick}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
