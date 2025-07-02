// src/components/midstay/hero/MidTermHero/StyledHero.js
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
        <p className="subheading">{subheading}</p>
        <p className="description">
          Midterm stays are ideal for individuals seeking flexible rental solutions — longer than a vacation, yet shorter than a traditional lease. 
          Perfect for remote workers, digital nomads, corporate travelers, or families in transition. These fully furnished rentals offer the comfort 
          of home with the convenience of a hotel. All utilities, internet, and monthly bills are included — so you can simply move in and start enjoying 
          your stay without setup or maintenance worries.
        </p>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default StyledHero;
