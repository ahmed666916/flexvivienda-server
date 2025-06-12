import React from 'react';
import './SplitPage.css';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine } from 'react-icons/fa';

const SplitPage = () => {
  return (
    <div className="split-container">
      <div className="split left">
        <div className="content">
          <FaHome className="icon" />
          <h1>Become a Host</h1>
          <p>Share your space and earn income with ease.</p>
          <Link to={"/owner_listing"}><button className="split-button">Get Started</button></Link>
        </div>
      </div>
      <div className="divider"></div>
      <div className="split right">
        <div className="content">
          <FaChartLine className="icon" />
          <h1>Invest</h1>
          <p>Grow your wealth by investing in properties.</p>
          <button className="split-button">Explore Options</button>
        </div>
      </div>
    </div>
  );
};

export default SplitPage;
