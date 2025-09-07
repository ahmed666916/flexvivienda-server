import React, { useState } from 'react';
import './SearchBarListing.css';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';
import { FaSearch } from 'react-icons/fa';
import FilterModal from '../FilterModal/FilterModal';

const cities = [
  'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana',
  'Gaziantep', 'Konya', 'Kayseri', 'Mersin', 'Eskişehir',
  'Trabzon', 'Samsun', 'Diyarbakır', 'Erzurum', 'Van'
];

const SearchBar = ({ className = '' }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`airbnb-searchbar ${className}`}>
      {/* Filter modal */}
      {showModal && <FilterModal onClose={toggleModal} />}

      <div className="searchbar-inner">
        {/* City input */}
        <div className="searchbar-item city-input">
          <input
            type="text"
            placeholder="Where"
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

        {/* Date picker */}
        <div className="searchbar-item date-input">
          <DateRangeDropdown />
        </div>

        {/* Guests */}
        <div className="searchbar-item guest-input">
          <input type="number" placeholder="Guests" min="1" />
        </div>

        {/* Filter + Search */}
        <div className="searchbar-item actions">
          <button className="filter-btn" onClick={toggleModal}>Filters</button>
          <Link to="/listing">
            <button className="search-btn">
            <FaSearch /> Search
          </button>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
