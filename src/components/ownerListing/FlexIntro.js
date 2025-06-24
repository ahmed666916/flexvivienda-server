import React, { useState } from 'react';
import './FlexIntro.css';
import { 
  MdOutlineCleanHands,
  MdOutlineWorkspacePremium,
  MdOutlinePersonalInjury 
 } from "react-icons/md";

 import { GoGraph } from "react-icons/go";
 import { FaRocketchat } from "react-icons/fa";

const FlexIntro = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="flex-intro-container">
      <div className="flex-left">
       
        <h3>About Flex</h3>
        <p>
          Flex makes short-term rentals effortless for you. Your listings appear on all platforms,
          and all processes can be followed from a single app. From cleaning to guest communication,
          every step is handled with high quality—so all you have to do is enjoy the profit!
        </p>

        <ul className='listAboutFlatix'>
          <li><MdOutlineCleanHands /> <strong>Priority on Hygiene and Attention to Detail:</strong> Every cleaning undergoes inspection.</li>
          <li><MdOutlineWorkspacePremium />
<strong> Premium Guest Experience:</strong> We provide 5-star service to every guest!</li>
          <li><MdOutlinePersonalInjury /> <strong>Personalized Service Packages:</strong> Rental solutions customized for different needs!</li>
          <li><GoGraph />
<strong> Transparent Reporting:</strong> Earnings, costs, and occupancy rates are always at your fingertips!</li>
          <li><FaRocketchat /> <strong>24/7 Guest Communication:</strong> Guest questions and needs are responded to instantly!</li>
        </ul>
      </div>

      <div className="flex-right">
        {!playVideo ? (
          <div className="video-thumbnail-wrapper" onClick={() => setPlayVideo(true)}>
            <img
              src="Images/video_thumbnail.png"
              alt="Video Thumbnail"
              className="thumbnail"
            />
            <div className="play-icon">
              <svg
                viewBox="0 0 200 200"
                width="64"
                height="64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="90" fill="rgba(0, 0, 0, 0.5)" />
                <polygon points="80,60 80,140 140,100" fill="#fff" />
              </svg>
            </div>
          </div>

        ) : (
          <video controls autoPlay className="video-player">
            <source src="videos/flex-video-en.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default FlexIntro;
