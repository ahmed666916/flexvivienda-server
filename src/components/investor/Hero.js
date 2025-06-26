import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Invest with Us</h1>
          <p>
            Discover unique real estate opportunities tailored to your goals. 
            Whether you're a seasoned investor or just starting out, we provide 
            personalized guidance, data-driven insights, and a curated portfolio 
            of high-potential properties.
            <br /><br />
            Our team is committed to maximizing your returns and ensuring a smooth 
            investment journey — from research to closing.
          </p>
        </div>
      </div>
      <div className="hero-image">
        <img src="Images/building.png" alt="Investment Visual" />
      </div>
    </section>
  );
};

export default Hero;
