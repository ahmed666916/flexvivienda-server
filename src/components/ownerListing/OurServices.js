import React from 'react';
import SubscriptionPackage from './SubscriptionPackage';
import './OurServices.css';

const OurServices = () => {
  return (
    <section className="our-services-wrapper">
      <h2>Our Perfect Rental Experience Services</h2>
      <div className="our-services-grid">
        <SubscriptionPackage />
        <SubscriptionPackage />
        <SubscriptionPackage />
      </div>
    </section>
  );
};

export default OurServices;
