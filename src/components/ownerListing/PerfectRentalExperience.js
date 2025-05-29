import React from 'react';
import './PerfectRentalExperience.css';

const services = [
  {
    title: 'Profile & Listing Management',
    description: 'We list your property on leading platforms in the industry.',
    image: 'Images/profile_man.jpg',
  },
  {
    title: 'Professional Photography',
    description: 'We enhance your property’s visual appeal with professional photography.',
    image: 'Images/photography.jpg',
  },
  {
    title: 'Interior Design Support',
    description: 'We provide interior design solutions with our expert teams.',
    image: 'Images/interior.jpg',
  },
  {
    title: 'Price Optimization',
    description: 'We perform daily market analysis to determine the best pricing for your property.',
    image: 'Images/price_optimization.jpg',
  },
  {
    title: 'Cleaning & Linen Change',
    description: 'We provide professional cleaning and linen change services for our guests.',
    image: 'Images/cleaning.jpg',
  },
  {
    title: 'Guest Relations',
    description: 'We offer 24/7 communication support to our guests.',
    image: 'Images/guest_relation.jpg',
  },
  {
    title: '24-Hour Check-In',
    description: 'We provide guests with the ability to check in and out at any time.',
    image: 'Images/check_in.jpg',
  },
  {
    title: 'Maintenance & Repair',
    description: 'We take care of your property as if it were our own, resolving any issues promptly.',
    image: 'Images/maintenance.jpg  ',
  },
];

const PerfectRentalExperience = () => {
  return (
    <section className="perfect-experience-section">
      <h2>Our Perfect Rental Experience Services</h2>
      <div className="experience-container">
        {services.map((service, index) => (
          <div className="experience-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerfectRentalExperience;
