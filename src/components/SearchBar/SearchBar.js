import React, { useState } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';

const cities = [
  'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana',
  'Gaziantep', 'Konya', 'Kayseri', 'Mersin', 'Eskişehir',
  'Trabzon', 'Samsun', 'Diyarbakır', 'Erzurum', 'Van'
];

const SearchBar = ({ className = '' }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`search-bar-container ${className}`}>
      <section className="search-bar">
        
        <div className="input-group">

          <input
            id="location-input"
            type="text"
            placeholder="Select or type city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)} // Delay to allow click
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
          
          <DateRangeDropdown id="date-range" />
        </div>

        <div className="input-group">
        
          <input id="guests-input" type="number" placeholder="Guests" />
        </div>

        <div className="input-group search-button-group">
          <label className="invisible-label">Search</label>
          <Link to="/listing">
            <button>Search</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
