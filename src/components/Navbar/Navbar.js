import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand logo" to="/">
  <img src="/Images/logo.png" alt="Flex Logo" />
</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">{t('home')} <span className="sr-only">(current)</span></Link>
          </li>
          
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Explore Stays
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Short Stays</a>
              <a className="dropdown-item" href="#">Mid Stays</a>
              <a className="dropdown-item" href="#">Long Stays</a>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">Blog</Link>
          </li>
          <li className="nav-item"> 
            <Link className="nav-link" to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
        </ul>
        <div className=" my-2 my-lg-0">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item" ><Link to="/SplitPage"><button className="btn  my-2 my-sm-0 listPropertyBtn" type="submit">Become a Host / Invest</button></Link></li>
           
           <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className='nav-item'>
              <Link className="nav-link" to="/Signup">Sign Up</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Language
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" onClick={(e)=>changeLanguage("en")} href="#">English</a>
              <a className="dropdown-item" onClick={(e)=>changeLanguage("tr")} href="#">Türkçe</a>
              <a className="dropdown-item" onClick={(e)=>changeLanguage("ar")} href="#">العربية</a>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
