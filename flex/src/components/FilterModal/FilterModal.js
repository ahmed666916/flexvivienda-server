import React, { useState } from 'react';
import './FilterModal.css';
import { FaTimes } from 'react-icons/fa';

const FilterModal = ({ onClose }) => {
  const [price, setPrice] = useState(250);
  const [rooms, setRooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);

  const toggleChip = (set, value) => {
    set(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const [services, setServices] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [types, setTypes] = useState([]);

  return (
    <div className="bg-modal-overlay">
      <div className="bg-modal">
        <button className="bg-close-btn" onClick={onClose}><FaTimes /></button>
        <h2 className="bg-title">Filters</h2>

        <div className="bg-section">
          <label>Price Range</label>
          <input
            type="range"
            min={50}
            max={500}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="bg-price-value">Up to ${price}</div>
        </div>

        <div className="bg-section">
          <label>Rooms & Beds</label>
          <div className="bg-stepper-group">
            {[
              ['Rooms', rooms, setRooms],
              ['Beds', beds, setBeds],
              ['Baths', baths, setBaths]
            ].map(([label, value, setter]) => (
              <div className="bg-stepper" key={label}>
                <span>{label}</span>
                <div>
                  <button onClick={() => setter(Math.max(0, value - 1))}>-</button>
                  <span>{value}</span>
                  <button onClick={() => setter(value + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-section">
          <label>Services</label>
          <div className="bg-chip-group">
            {['WiFi', 'Kitchen', 'Washing Machine', 'Dryer', 'Air Conditioning'].map(item => (
              <button
                key={item}
                className={`bg-chip ${services.includes(item) ? 'active' : ''}`}
                onClick={() => toggleChip(setServices, item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-section">
          <label>Benefits</label>
          <div className="bg-chip-group">
            {['Pool', 'Jacuzzi', 'Free Parking', 'EV Charger'].map(item => (
              <button
                key={item}
                className={`bg-chip ${benefits.includes(item) ? 'active' : ''}`}
                onClick={() => toggleChip(setBenefits, item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-section">
          <label>Residence Type</label>
          <div className="bg-chip-group">
            {['Home', 'Flat', 'Hotel'].map(item => (
              <button
                key={item}
                className={`bg-chip ${types.includes(item) ? 'active' : ''}`}
                onClick={() => toggleChip(setTypes, item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-footer">
          <button className="bg-apply">Apply</button>
          <button className="bg-reset" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
