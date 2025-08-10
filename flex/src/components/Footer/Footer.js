import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  // This ensures the correct public path is used (works in dev + build)
  const bgImage = `${process.env.PUBLIC_URL}/Images/logo-bg.png`;

  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '85%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="footer-container">
        {/* Left: Mission */}
        <div className="footer-left">
          <p>Empowering modern stays with smart hospitality solutions.</p>
        </div>

        {/* Center: Nav + faint logo */}
        <div className="footer-center footer-logo-block">
          <nav className="footer-nav-links" aria-label="Footer navigation">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/explore" className="footer-link">Explore</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/about" className="footer-link">About Us</Link>
          </nav>

          <div className="footer-logo-overlay" aria-hidden="true">
            <img
              src={`${process.env.PUBLIC_URL}/Images/logo.png`}
              alt=""
              className="footer-bg-logo"
            />
          </div>
        </div>

        {/* Right: Contact */}
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p><FaEnvelope aria-hidden="true" /> <a className="footer-mail" href="mailto:flex@flatix.com">flex@flatix.com</a></p>
          <p><FaPhone aria-hidden="true" /> <a className="footer-phone" href="tel:+905386807740">+90 538 680 7740</a></p>
          <a
            href="https://wa.me/905386483175"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" /> WhatsApp Us
          </a>
          <div className="footer-socials">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin aria-hidden="true" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Flex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
