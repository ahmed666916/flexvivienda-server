import React from 'react';
import './SplitPage.css';
import { Link } from 'react-router-dom';
import hostBg from '../../assets/host-bg-resized.png';
import investBg from '../../assets/invest-bg-resized.png';

const SplitPage = () => {
  return (
    <div className="split-container">
      <Link to="/owner_listing" className="split-link">
        <div
          className="split left hoverable"
          style={{ backgroundImage: `url(${hostBg})` }}
        />
      </Link>

      <div className="divider"></div>

      <Link to="/invest" className="split-link">
        <div
          className="split right hoverable"
          style={{ backgroundImage: `url(${investBg})` }}
        />
      </Link>
    </div>
  );
};

export default SplitPage;
