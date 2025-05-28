// src/components/Hero/Hero.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import SearchBar from '../SearchBar/SearchBar';

const images = [
  '/Images/hero1.jpeg',
  '/Images/hero2.jpg',
  '/Images/hero3.jpg',
  '/Images/hero4.jpg',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay"></div> {/* Dark overlay */}
      <div className="hero-content">
        <h1>Your Property. Our Expertise. Maximized Returns</h1>
        <p>Flexible rental solutions — short, mid, or long term. Fully managed.</p>
        
      </div>
    </section>
  );
};

export default Hero;
