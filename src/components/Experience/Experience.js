import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section className="experience-section">
      <div className="experience-container">
        <h2 className="experience-heading">A Personalized Home Experience</h2>
        <p className="experience-subtext">Explore curated stays tailored for style, comfort, and smart living.</p>

        <div className="experience-cards">
          <div className="experience-card">
            <img src="/Images/striking-home.jpg" alt="Striking Home" />
            <h3>Striking Homes</h3>
            <p>Homes that prioritize visual aesthetics, offering tranquility and comfort with elegant designs.</p>
          </div>

          <div className="experience-card">
            <img src="/Images/comfortable-stay.jpg" alt="Comfortable Stay" />
            <h3>Comfortable Stays</h3>
            <p>Fully equipped homes that offer a cozy and familiar experience just like home.</p>
          </div>

          <div className="experience-card">
            <img src="/Images/smart-home.jpg" alt="Smart Home" />
            <h3>Smart Home Technology</h3>
            <p>Enjoy convenience and peace of mind in homes enhanced with smart features and automation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
