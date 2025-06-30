import React from 'react';
import './FutureOfLivingSection.css';

const cards = [
  {
    title: 'Hand-picked homes',
    desc: 'Only the best apartments, buildings, and neighborhoods in the world.',
    img: '/Images/hero1.jpeg'
  },
  {
    title: 'Move-in ready',
    desc: 'Beautifully furnished and curated spaces that are fully equipped from day one.',
    img: '/Images/hero2.jpg'
  },
  {
    title: 'Flexible terms',
    desc: 'Modern leases so you can move in and out easily, live month-to-month or stay for a year or less.',
    img: '/Images/hero3.jpg'
  },
  {
    title: 'High-touch service',
    desc: 'Reliable support and a consistent, quality experience in every location.',
    img: '/Images/future-living.jpg'
  }
];

const FutureOfLivingSection = () => (
  <section className="future-section">
    <h2>Welcome to the future of living</h2>
    <p>Find the peace of mind, flexibility, and confidence to start your latest adventure — a new work gig, a home in between leases, or travel fever — with the ease and comfort of a modern home.</p>
    <div className="cards-grid">
      {cards.map((card, index) => (
        <div className="feature-card" key={index}>
          <img src={card.img} alt={card.title} />
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FutureOfLivingSection;
