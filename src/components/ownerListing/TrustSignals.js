import React, { useEffect, useRef, useState } from 'react';
import './TrustSignals.css';

const partnerLogos = [
  { name: 'Airbnb', src: '/Images/airbnb.png' },
  { name: 'Booking.com', src: '/Images/booking.png' },
  { name: 'VRBO', src: '/Images/vrbo.png' },
];

const mediaLogos = [
  { name: 'Forbes', src: '/Images/forbes.png' },
  { name: 'TechCrunch', src: '/Images/techcrunch.png' },
  { name: 'CNN', src: '/Images/cnn.png' },
];

const stats = [
  '500+ Properties Managed',
  '4.8★ Guest Rating',
  '10,000+ Stays Managed',
];

const TrustSignals = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className={`trust-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <h2 className="trust-title">Trusted By Leading Platforms</h2>

      <div className="logo-row">
        {partnerLogos.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.name} className="trust-logo" />
        ))}
      </div>

      <h3 className="media-title">Featured In</h3>
      <div className="logo-row">
        {mediaLogos.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.name} className="media-logo" />
        ))}
      </div>

      <div className="stats-row">
        {stats.map((text, i) => (
          <div className="stat-box" key={i}>
            {text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSignals;
