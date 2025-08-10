import React from 'react';
import './FutureOfLivingSection.css';

const features = [
  {
    image: '/Images/hero1.jpeg',
    title: 'Hand-picked homes',
    description: 'Only the best apartments, buildings, and neighborhoods in the world.',
  },
  {
    image: '/Images/hero2.jpg',
    title: 'Move-in ready',
    description: 'Beautifully furnished and curated spaces that are fully equipped from day one.',
  },
  {
    image: '/Images/hero3.jpg',
    title: 'Flexible terms',
    description: 'Modern leases so you can move in and out easily, live month-to-month or stay for a year or less.',
  },
  {
    image: '/Images/future-living.jpg',
    title: 'High-touch service',
    description: 'Reliable support and a consistent, quality experience in every location.',
  },
];

const FutureOfLivingSection = () => (
  <section className="future-living-section section-block">
    <div className="heading-container future-of-living">
      <h2 className="heading">
        <span className="red">Welcome</span> <span className="black">to the future of living</span>
      </h2>
      <p className="heading-subtext">
        Find the peace of mind, flexibility, and confidence to start your latest adventure — a new work gig, a home in between leases, or travel fever — with the ease and comfort of a modern home.
      </p>
    </div>
    <div className="feature-grid">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <img src={feature.image} alt={feature.title} />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FutureOfLivingSection;
