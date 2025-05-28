import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">

      {/* Left: Logo + Mission Statement */}
      <div className="footer-left">
        {/* <img src="/logo.png" alt="Missafir Logo" className="footer-logo" /> */}
        <h1>Flex Logo</h1>
        <p>Empowering modern stays with smart hospitality solutions.</p>
      </div>

      {/* Center: Navigation Links */}
      <div className="footer-center">
        <h4>Quick Links</h4>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/terms">Terms</Link></li>
        </ul>
      </div>

      {/* Right: Contact Info */}
      <div className="footer-right">
        <h4>Contact Us</h4>
        <p>Email: flex@flatix.com</p>
        <p>Phone: +905386807740</p>
        <Link
          to="https://wa.me/905386483175"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp /> WhatsApp Us
        </Link>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        </div>
      </div>

    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Flex. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
