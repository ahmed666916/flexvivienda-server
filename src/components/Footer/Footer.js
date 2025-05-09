import React from 'react';
import './Footer.css'; // Create corresponding CSS for styling

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Missafir. All rights reserved.</p>
  </footer>
);

export default Footer;
