import React from 'react';
import './LifestyleSection.css';

const cards = [
  {
    title: 'More savings',
    description:
      'Access our best rental rates, save up to $13K up front, and get discounted storage rates when possible.',
    imgSrc: '/Images/saving_long.jpg',
  },
  {
    title: 'More flexibility',
    description:
      'Don’t worry about paying rent when you vacation, visit family, or go on a work trip.',
    imgSrc: '/Images/adventure.jpg',
  },
  {
    title: 'More exploration',
    description:
      'Switch qualifying apartments across our portfolio with just a month’s notice.',
    imgSrc: '/Images/swap.jpg',
  },
];

const LifestyleSection = () => (
  <section className="lifestyle-section-long">
    <h2 className="lifestyle-title-long">Live where & how you want</h2>
    <div className="cards-container-long">
      {cards.map((card, idx) => (
        <div className="card" key={idx}>
          <img src={card.imgSrc} alt={card.title} />
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default LifestyleSection;
