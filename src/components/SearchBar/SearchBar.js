import React, { useState } from 'react';
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
  const [showList, setShowList] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-container">
        {/* Location */}
        <div className="search-item">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Select or type city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)}
          />
          {showList && (
            <ul className="dropdown-list">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <li key={index} onClick={() => setSearch(city)}>{city}</li>
                ))
              ) : (
                <li className="no-result">No results</li>
              )}
            </ul>
          )}
        </div>

        {/* Date Range */}
        <div className="search-item">
          <FaCalendarAlt className="icon" />
          <DateRangeDropdown />
        </div>

        <div className="search-item guest-picker">
        <FaUser className="icon" />
        <div className="guest-controls">
          <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))}>−</button>
          <span className="guest-count">{guestCount}</span>
          <button onClick={() => setGuestCount(guestCount + 1)}>+</button>
        </div>
        <span className="guest-label">guests</span>
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
