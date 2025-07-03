// src/components/longterm/Hero/StyledHero.js

import React, { useEffect, useState } from 'react';
import './StyledHero.css';
import SearchBar from '../../SearchBar/SearchBar';     


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
          Long-term stays are perfect for individuals or families seeking extended housing with all the comfort of home. 
          Ideal for relocations, work assignments, or extended visits. Our fully furnished accommodations come with flexible lease terms, 
          inclusive monthly bills, maintenance, and hotel-style services — so you can settle in without hassle.
        </p>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default StyledHero;
