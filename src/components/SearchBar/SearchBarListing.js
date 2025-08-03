import React, { useState } from 'react';
import './SearchBarListing.css';
import { Link } from 'react-router-dom';
import DateRangeDropdown from './DateRangeDropdown';
import { FaFilter, FaSearch } from 'react-icons/fa';
import FilterModal from '../FilterModal/FilterModal'; // 👈 Import the new FilterModal

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
    <div className={`search-bar-container-listing ${className}`}>
      {/* New Blueground-style Filter Modal */}
      {showModal && <FilterModal onClose={toggleModal} />}

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
              <button className="search-btn"><FaSearch /> Search</button>
            </Link>
            <button className="filter-button" onClick={toggleModal}><FaFilter /> Filters</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
