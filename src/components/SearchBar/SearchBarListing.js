import React, { useState } from 'react';
import './SearchBarListing.css';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';
import { FaFilter, FaSearch, FaDoorOpen, FaWifi, FaUtensils, FaSoap, FaTshirt, FaSnowflake, FaFireAlt, FaLaptop, FaTv, FaBath, FaSwimmingPool, FaCar, FaChargingStation, FaBaby, FaBed, FaDumbbell, FaHotTub, FaCoffee, FaSmoking, FaDog, FaHome, FaBuilding, FaHotel, FaBell, FaExclamationTriangle } from 'react-icons/fa';

const cities = [
  'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana',
  'Gaziantep', 'Konya', 'Kayseri', 'Mersin', 'Eskişehir',
  'Trabzon', 'Samsun', 'Diyarbakır', 'Erzurum', 'Van'
];

const SearchBar = ({ className = '' }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [rooms, setRooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [price, setPrice] = useState(250);

  const toggleModal = () => setShowModal(!showModal);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`search-bar-container-listing ${className}`}>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content enhanced-filter">
          <button className="modal-close-button" onClick={toggleModal}>
            &times;
          </button>
          
            <div className="modal-body">
              <h2>Filters</h2>

              <div className="filter-group full-width">
                <label className="filter-label">Price Range</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  className="price-range-slider"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="price-display">Up to ${price}</div>
              </div>

              <div className="section rooms-section">
                <h4>Rooms & Beds</h4>
                <div className="counter-group">
                  <div className="counter-item">
                    <FaDoorOpen className="counter-icon" />
                    <span>Rooms</span>
                    <button onClick={() => setRooms(Math.max(0, rooms - 1))}>-</button>
                    <span>{rooms}</span>
                    <button onClick={() => setRooms(rooms + 1)}>+</button>
                  </div>
                  <div className="counter-item">
                    <FaBed className="counter-icon" />
                    <span>Beds</span>
                    <button onClick={() => setBeds(Math.max(0, beds - 1))}>-</button>
                    <span>{beds}</span>
                    <button onClick={() => setBeds(beds + 1)}>+</button>
                  </div>
                  <div className="counter-item">
                    <FaBath className="counter-icon" />
                    <span>Baths</span>
                    <button onClick={() => setBaths(Math.max(0, baths - 1))}>-</button>
                    <span>{baths}</span>
                    <button onClick={() => setBaths(baths + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <label>Services</label>
                <div className="chip-container">
                  {[{ icon: <FaWifi />, label: 'WiFi' }, { icon: <FaUtensils />, label: 'Kitchen' }, { icon: <FaSoap />, label: 'Washing Machine' }, { icon: <FaTshirt />, label: 'Dryer' }, { icon: <FaSnowflake />, label: 'Air Conditioning' }, { icon: <FaFireAlt />, label: 'Heating' }, { icon: <FaLaptop />, label: 'Work Area' }, { icon: <FaTv />, label: 'TV' }, { icon: <FaBath />, label: 'Hair Dryer' }, { icon: <FaUtensils />, label: 'Oven' }].map(({ icon, label }) => (
                    <button key={label} className="chip-button">{icon} {label}</button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <label>Benefits</label>
                <div className="chip-container">
                  {[{ icon: <FaSwimmingPool />, label: 'Pool' }, { icon: <FaHotTub />, label: 'Jacuzzi' }, { icon: <FaCar />, label: 'Free Parking' }, { icon: <FaChargingStation />, label: 'EV Charger' }, { icon: <FaBaby />, label: 'Cradle' }, { icon: <FaBed />, label: 'King Bed' }, { icon: <FaDumbbell />, label: 'Gym' }, { icon: <FaHotTub />, label: 'Barbecue' }, { icon: <FaCoffee />, label: 'Breakfast' }, { icon: <FaFireAlt />, label: 'Indoor Fireplace' }, { icon: <FaSmoking />, label: 'Smoking Friendly' }, { icon: <FaDog />, label: 'Pet Friendly' }].map(({ icon, label }) => (
                    <button key={label} className="chip-button">{icon} {label}</button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <label>Security</label>
                <div className="chip-container">
                  {[{ icon: <FaBell />, label: 'Smoke Detector' }, { icon: <FaExclamationTriangle />, label: 'CO Detector' }].map(({ icon, label }) => (
                    <button key={label} className="chip-button">{icon} {label}</button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <label>Booking Type</label>
                <div className="chip-container">
                  {['Long Term', 'Short Term', 'Mid Term'].map(option => (
                    <button key={option} className="chip-button">{option}</button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <label>Residence Type</label>
                <div className="chip-container">
                  {[{ icon: <FaHome />, label: 'Home' }, { icon: <FaBuilding />, label: 'Flat' }, { icon: <FaHotel />, label: 'Hotel' }].map(({ icon, label }) => (
                    <button key={label} className="chip-button">{icon} {label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <section className="search-bar-listing">
        <div className="input-group">
          <input
            type="text"
            placeholder="Select or type city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)}
            autoComplete="off"
          />
          {showList && (
            <ul className="dropdown-list">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <li key={index} onClick={() => setSearch(city)}>
                    {city}
                  </li>
                ))
              ) : (
                <li className="no-result">No results</li>
              )}
            </ul>
          )}
        </div>

        <div className="input-group">
          <DateRangeDropdown />
        </div>

        <div className="input-group">
          <input type="number" placeholder="Guests" />
        </div>

        <div className="input-group search-button-group">
          <div className="button-row">
            <Link to="/listing">
              <button className="search-btn">
                <FaSearch /> Search
              </button>
            </Link>
            <button className="filter-button" onClick={toggleModal}>
              <FaFilter /> Filters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
