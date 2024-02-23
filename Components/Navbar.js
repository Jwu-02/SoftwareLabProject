import React, { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav>
      <div className="nav-logo-container">
        <a style={{ fontSize: '48px' }}>User Management</a>
      </div>
      <div className="navbar-links-container">
        <a href="">ECE461L: Group 2</a>
      </div>
    </nav>
  );
};

export default Navbar;