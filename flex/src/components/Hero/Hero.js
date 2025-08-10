// src/components/Hero/Hero.js
import React, { useEffect, useState } from 'react';
import './Hero.css';
import SearchBar from '../SearchBar/SearchBar';

const images = [
  '/Images/hero1.jpeg',
  '/Images/hero2.jpg',
  '/Images/hero3.jpg',
  '/Images/hero4.jpg',
];

const Hero = ({ heading = "Your Property. Our Expertise. Maximized Returns", subheading = "Flexible rental solutions → short, mid, or long term. Fully managed." }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      <div className="overlay"></div>

      <div className="hero-contents">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <div className="searchbar-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
