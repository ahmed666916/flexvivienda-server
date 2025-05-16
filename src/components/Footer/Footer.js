import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <p>&copy; {new Date().getFullYear()} Missafir. All rights reserved.</p>
      
      <div className="footer-links">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="footer-socials">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
