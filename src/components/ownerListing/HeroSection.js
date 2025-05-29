import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          Maximize Your Property’s Potential — Hands-Free Rental Management
        </h1>
        <div className="hero-buttons">
          <button className="hero-btn primary">List Your Property</button>
          <button className="hero-btn secondary">Get a Free Income Estimate</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
