import React from 'react'
import Logo from "/assets/logo.png";

const Navbar = () => {
  return (
    <div>
    <nav className="navbar">
      <div id="logo_box">
        <img id="logo" src={Logo} alt="logo" />
        <span id="logo_name">Riya Kansal</span>
      </div>
    </nav>
    <div className="content"></div>
  </div>
  )
}

export default Navbar