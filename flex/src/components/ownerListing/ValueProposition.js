import React from 'react';
import './ValueProposition.css';
import { FaChartLine, FaBriefcase , FaGlobe, FaCogs,FaHandshake  } from 'react-icons/fa';
import { CiTimer } from "react-icons/ci";
import { IoPhonePortrait } from "react-icons/io5";

const valuePoints = [
  {
    icon: <FaChartLine />,
    title: 'Provides High Return on Investment',
  },
  {
    icon: <FaHandshake />,
    title: 'Offers Stress-Free and Easy Rental Experience',
  },
  {
    icon: <CiTimer  />,
    title: 'Lists Your Property on Every Channel with Multi-Platform Integration',
  },
  {
    icon: <IoPhonePortrait  />,
    title: 'Easy Management with Synchronized Property Tracking App',
  },
  {
    icon: <FaBriefcase   />,
    title: 'Provides a High Standard of Service',
  },
];

const ValueProposition = () => {
  return (
    <section className="value-section">
      <h2 className="value-title">Why Choose Us?</h2>
      <div className="value-cards">
        {valuePoints.map((item, index) => (
          <div className="value-card" key={index}>
            <div className="value-icon">{item.icon}</div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
