import React from 'react';
import './ValueProposition.css';
import { FaChartLine, FaHeadset, FaGlobe, FaCogs } from 'react-icons/fa';

const valuePoints = [
  {
    icon: <FaChartLine />,
    title: 'Dynamic Pricing for Higher ROI',
  },
  {
    icon: <FaHeadset />,
    title: '24/7 Guest Support',
  },
  {
    icon: <FaGlobe />,
    title: 'Multi-platform Listing (Airbnb, Booking.com, etc.)',
  },
  {
    icon: <FaCogs />,
    title: 'End-to-End Management',
  },
];

const ValueProposition = () => {
  return (
    <section className="value-section">
      <h2 className="value-title">Why Choose Us?</h2>
      <div className="value-cards">
        {valuePoints.map((item, index) => (
          <div className="value-card" key={index}>
            <div className="value-icon">{item.icon}</div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
