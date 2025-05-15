import React from 'react';
import './BecomeMissafirSteps.css';

const steps = [
  {
    title: 'Step 1',
    description: 'Calculate Potential Earnings',
    image: 'images/potential_earning.jpg',
  },
  {
    title: 'Step 2',
    description: 'Home Visit',
    image: 'images/home_visit.jpg',
  },
  {
    title: 'Step 3',
    description: 'Key Handover',
    image: 'images/key_handover.jpg',
  },
  {
    title: 'Step 4',
    description: 'Professional Photography',
    image: 'images/photography.jpg',
  },
  {
    title: 'Step 5',
    description: 'Listing Publication',
    image: 'images/list.jpg',
  },
];

const BecomeMissafirSteps = () => {
  return (
    <section className="steps-section">
      <h2>Rent your home in 5 Steps</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <img src={step.image} alt={step.title} />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BecomeMissafirSteps;
