import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';

const cities = [
  'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana',
  'Gaziantep', 'Konya', 'Kayseri', 'Mersin', 'Eskişehir',
  'Trabzon', 'Samsun', 'Diyarbakır', 'Erzurum', 'Van'
];

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [showCityList, setShowCityList] = useState(false);
  const [guestDropdown, setGuestDropdown] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, kids: 0, pets: 0 });

  const guestRef = useRef();

  // Close guest dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setGuestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const updateGuest = (type, delta) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-container">

        {/* City Picker */}
        <div className="search-item" onClick={() => setShowCityList(true)}>
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Where"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowCityList(true)}
            onBlur={() => setTimeout(() => setShowCityList(false), 150)}
          />
          {showCityList && (
            <ul className="dropdown-list">
              {filteredCities.map((city, index) => (
                <li key={index} onClick={() => setSearch(city)}>
                  <strong>{city}</strong><br />
                  <span className="city-subtext">Turkey</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Calendar */}
        <div className="search-item">
          <FaCalendarAlt className="icon" />
          <DateRangeDropdown />
        </div>

        {/* Guests */}
        <div
          className="search-item guest-selector"
          onClick={() => setGuestDropdown(!guestDropdown)}
        >
          <FaUser className="icon" />
          <span>Add guests</span>

          {guestDropdown && (
            <div className="guest-dropdown" ref={guestRef}>
              {['adults', 'kids', 'pets'].map((type) => (
                <div className="guest-row" key={type}>
                  <div className="guest-labels">
                    <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                    <small>
                      {type === 'adults' ? '12+' : type === 'kids' ? '0–12' : ''}
                    </small>
                  </div>
                  <div className="guest-buttons">
                    <button onClick={(e) => { e.stopPropagation(); updateGuest(type, -1); }}>
                      <FaMinus />
                    </button>
                    <span>{guests[type]}</span>
                    <button onClick={(e) => { e.stopPropagation(); updateGuest(type, 1); }}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Link to="/listing">
          <button className="search-button">Search</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
