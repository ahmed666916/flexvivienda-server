import React, { useState } from 'react';
import './ListingFilter.css';

const ListingFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button className="filter-button" onClick={toggleModal}>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 24 24" className="funnel-icon">
    <path d="M3 4h18v2l-7 9v5l-4 2v-7L3 6z" />
  </svg>
  Filter
</button>


      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Filter Options</h3>
            <div className="filter-option">
              <label>Property Type:</label>
              <select>
                <option>Apartment</option>
                <option>House</option>
                <option>Studio</option>
              </select>
            </div>
            <div className="filter-option">
              <label>Price Range:</label>
              <select>
                <option>$0 - $500</option>
                <option>$500 - $1000</option>
                <option>$1000+</option>
              </select>
            </div>
            <div className="filter-option">
              <label>Bedrooms:</label>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="apply-button" onClick={toggleModal}>Apply</button>
              <button className="close-button" onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingFilter;
