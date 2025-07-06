import React from 'react';
import './SplitPage.css';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine } from 'react-icons/fa';

const SplitPage = () => {
  return (
    <div className="split-container">
      <Link to="/owner_listing" className="split-link">
        <div className="split left hoverable">
          <div className="content">
            <FaHome className="icon" />
            <h1>Become a Host</h1>
            <p>Share your space and earn income with ease.</p>
          </div>
        </div>
      </Link>

      <div className="divider"></div>

      <Link to="/invest" className="split-link">
        <div className="split right hoverable">
          <div className="content">
            <FaChartLine className="icon" />
            <h1>Invest</h1>
            <p>Grow your wealth by investing in properties.</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SplitPage;
