import React from 'react';
import './SubscriptionPackage.css';
import { CheckCircle } from 'lucide-react'; // Optional icon library

const features = [
  'Ad Management on Over 50 Platforms',
  'Professional Photo Shoot of the Hotel',
  'Sales, Marketing, Reservation Activities',
  'Calendar Tracking via Panel',
  '24/7 Guest Communication Management',
  'Price Optimization',
  'Monthly Reporting',
  'Establishing and Managing a Professional Team',
  'Clean Operation',
  '24 Hour Check-in',
  'Booklets and Basic Requirements',
  'Welcome Package',
  'Maintenance and Repair Opportunities',
  'Quality and Control Continuity',
];

const SubscriptionPackage = () => {
  return (
    <div className="subscription-card">
      <h2 className="subscription-title">Hotel Management</h2>
      <p className="subscription-description">
        Ideal for businesses that need support in hotel management and want to increase business efficiency and profitability!
      </p>
      <ul className="subscription-features">
        {features.map((feature, idx) => (
          <li key={idx}>
            <CheckCircle className="check-icon" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="subscription-price">
        <h3>Starting from <span>$999/month</span></h3>
      </div>
    </div>
  );
};

export default SubscriptionPackage;
