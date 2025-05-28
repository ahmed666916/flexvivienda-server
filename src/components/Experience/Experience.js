import React from 'react';
import './Experience.css';

const experiences = [
  {
    image: '/Images/exp_1.jpeg',
    title: 'Elegant Homes',
    description: 'Homes focused on visual aesthetics, offering a peaceful and comfortable design for your living space.',
  },
  {
    image: '/Images/exp_2.jpeg',
    title: 'Smartly Designed',
    description: 'Functional and practical homes tailored for your modern lifestyle and daily needs.',
  },
  {
    image: '/Images/exp_3.jpeg',
    title: 'Unique Ambience',
    description: 'Each home offers a one-of-a-kind atmosphere, adding character and comfort to your stay.',
  },
];

const Experience = () => (
  <section className="experience-section">
    <div className="experience-header">
      <h2>A Personalized Home Experience</h2>
    </div>
    <div className="experience-cards">
      {experiences.map((exp, index) => (
        <div className="experience-card" key={index}>
          <img src={exp.image} alt={exp.title} />
          <h3>{exp.title}</h3>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
