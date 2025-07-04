import React from 'react';
import './SubscriptionPackage.css';
import { CheckCircle } from 'lucide-react';

const subscriptions = [
  {
    title: 'Flex Enterprise',
    commission: 'No 30% commission or package fee',
    description: `A comprehensive investment package for professional real estate investors. Flex helps identify undervalued buildings in Istanbul and other key Turkish locations. Includes renovation & rental readiness.`,
    features: [
      'Return-Based Building Selection',
      'Purchase of the Building',
      'Renovation Service',
      'Furnishing Service',
      '* Full management package service options are included.',
    ],
  },
  {
    title: 'Full Management',
    commission: '30% commission on reservations',
    description: `Perfect for owners abroad or with limited time. Covers listings, tenant handling, cleaning, billing, maintenance, and taxes—professionally managed.`,
    features: [
      'Photography and Listing',
      'Multi-Platform Integration',
      'Guest Communication',
      'Cleaning Service',
      'Maintenance and Repair Service',
      'Monthly Reporting',
    ],
  },
  {
    title: 'Listing Management',
    commission: '15% commission on reservations',
    description: `Designed for owners who handle operations themselves. Focuses on listing, digital promotion, and customer communication.`,
    features: [
      'Photography and Listing',
      'Multi-Platform Integration',
      'Guest Communication',
      'Monthly Reporting',
    ],
  },
  {
    title: 'Mid-Term Rental',
    commission: '20% commission on reservations',
    description: `Tailored for professionals needing mid-term stays. Fully furnished apartments for 1–12 months, including bills and legal support.`,
    features: [
      'Elite Corporate Client Network',
      'Lease Contract Management',
      '* Full management package service options are included.',
    ],
  },
];

const SubscriptionPackages = () => {
  return (
    <section className="subscription-section">
      <h2 className="subscription-header">Packages & Service Details</h2>

      <div className="subscription-grid">
        {subscriptions.map((pkg, index) => (
          <div className="subscription-card" key={index}>
            <h2>{pkg.title}</h2>
            <p className="subscription-commission">{pkg.commission}</p>
            <p className="subscription-description">{pkg.description}</p>
            <ul className="subscription-features">
              {pkg.features.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle className="check-icon" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPackages;
