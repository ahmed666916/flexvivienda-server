import React, { useState } from 'react';
import './ROICalculator.css';

const ROICalculator = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [rooms, setRooms] = useState('');
  const [roi, setRoi] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy ROI calculation logic
    const baseROI = 1000;
    const multiplier = rooms ? parseInt(rooms) : 1;
    const roiResult = baseROI * multiplier;
    setRoi(roiResult);
  };

  return (
    <section className="roi-section">
      <div className="roi-container">
        <div className="roi-copy">
          <h2 className="animated-text">
            Calculate Your ROI — It’s Fast, Free & Insightful
          </h2>
          <p>
            Discover the potential of your property instantly. No commitments, just smart estimates that help you plan ahead with confidence.
          </p>
        </div>

        <form className="roi-form" onSubmit={handleSubmit}>
          <h3>ROI Calculator</h3>
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
          >
            <option value="">Select Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
          </select>

          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
          >
            <option value="">Number of Rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4+ Rooms</option>
          </select>

          <button type="submit">Calculate ROI</button>

          {roi !== null && (
            <div className="roi-result">
              Estimated ROI: <strong>${roi.toLocaleString()}</strong> / month
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ROICalculator;
