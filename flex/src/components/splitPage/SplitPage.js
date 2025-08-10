import React from 'react';
import './SplitPage.css';
import { Link } from 'react-router-dom';
import hostBg from '../../assets/host-bg-resized.png';
import investBg from '../../assets/invest-bg-resized.png';
import { FaHome, FaChartLine } from 'react-icons/fa';

const SplitPage = () => {
  return (
    <div className="split-container">
      <Link to="/owner_listing" className="split-link">
        <div
          className="split left hoverable"
          style={{ backgroundImage: `url(${hostBg})` }}
        >
          <div className="overlay-content">
            <FaHome className="overlay-icon" />
            <h1>Become a Host</h1>
            <p>Share your space and earn income with ease.</p>
          </div>
        </div>
      </Link>

      <Link to="/invest" className="split-link">
        <div
          className="split right hoverable"
          style={{ backgroundImage: `url(${investBg})` }}
        >
          <div className="overlay-content">
            <FaChartLine className="overlay-icon" />
            <h1>Invest</h1>
            <p>Grow your wealth by investing in properties.</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SplitPage;
