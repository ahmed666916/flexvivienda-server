import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/Logo.png" alt="Logo" />
      </div>

      <div className="language-select">
        <button>{language} ▼</button>
        <div className="language-options">
          <div onClick={() => setLanguage('EN')}>English</div>
          <div onClick={() => setLanguage('TR')}>Türkçe</div>
          <div onClick={() => setLanguage('AR')}>العربية</div>
        </div>
      </div>

      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/owner_listing">List Your Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/Signup" className="btn">Sign Up</Link></li>
        <li><Link to="/login" className="btn outline">Login</Link></li>
      </ul>

      <div className="burger-icon" onClick={toggleMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
