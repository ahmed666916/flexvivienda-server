import React from 'react';
import './about.css';
import Team from '../components/team/Team'

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        At Missafir, we believe in making every home feel like a five-star experience.
        From property management to guest hospitality, we combine technology and human touch to redefine comfort.
      </p>
      <Team />
    </div>

    
  );
};

export default About;
