// src/components/StyledHero/StyledHero.js
import React, { useEffect, useState } from 'react';
import './StyledHero.css';
import SearchBar from '../../../SearchBar/SearchBar';

const images = [
  '/Images/hero1.jpeg',
  '/Images/hero2.jpg',
  '/Images/hero3.jpg',
  '/Images/hero4.jpg',
];

const StyledHero = ({ heading, subheading }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      className="styled-hero"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className="styled-overlay"></div>
      <div className="hero-card">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <p className="description">
          Midterm stays are ideal for those seeking flexible rental solutions — longer
          than a typical vacation but shorter than a traditional lease. Perfect for
          remote workers, digital nomads, or families relocating.
        </p>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default StyledHero;
