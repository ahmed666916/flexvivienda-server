import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Footer = () => (
  <footer
  className="footer"
  style={{
    backgroundImage: 'url("/Images/logo-bg.png")',
    backgroundSize: '85%', // Smaller background image
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 0,
  }}
>

    {/* Overlay tint */}
    <div className="footer-overlay" />

    <div className="footer-container">
      {/* Left: Mission Statement */}
      <div className="footer-left">
        <p>Empowering modern stays with smart hospitality solutions.</p>
      </div>

      <div className="footer-center footer-logo-block">
  <div className="footer-nav-links">
    <Link to="/" className="footer-link">Home</Link>
    <Link to="/explore" className="footer-link">Explore</Link>
    <Link to="/blog" className="footer-link">Blog</Link>
    <Link to="/contact" className="footer-link">Contact</Link>
    <Link to="/about" className="footer-link">About Us</Link>
  </div>

  <div className="footer-logo-overlay">
    <img src="/Images/logo.png" alt="Flex Logo" className="footer-bg-logo" />
  </div>
</div>


      {/* Right: Contact Info */}
      <div className="footer-right">
        <h4>Contact Us</h4>
        <p><FaEnvelope /> flex@flatix.com</p>
        <p><FaPhone /> +905386807740</p>
        <a
          href="https://wa.me/905386483175"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp /> WhatsApp Us
        </a>
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
