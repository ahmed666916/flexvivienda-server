import React from 'react';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import PropertyList from '../components/PropertyList/PropertyList';
import PropertyCitiesList from '../components/PropertyList/PropertyCitiesList';
import Testimonials from '../components/Testimonial/Testimonial';
import Experience from '../components/Experience/Experience';
import Blog from '../components/blog/blog';
import { useTranslation } from 'react-i18next';
import TrustSignals from '../components/ownerListing/TrustSignals';
import FutureOfLivingSection from '../components/FutureOfLivingSection/FutureOfLivingSection';
import BetterHomeSlider from '../components/BetterHomeSlider/BetterHomeSlider';
import './home.css';
import MyClusterMap from '../components/map/MyClusterMap';

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Hero heading={t('heroMessage')} subheading={t('heroSubtitle')} />

      <div className="section-block">
        <PropertyList title="Featured Listings" tabs="0" maps="1" tags="1" short="1" showHeading="1" />

      </div>

      <div className="section-block home-property-section">
        <PropertyList title="Perfect Locations" tabs="1" maps="0" tags="0" short="1" />
      </div>

      <div className="section-block city-explorer">
        <PropertyCitiesList title="Explore Properties in Cities" tabs="1" tags="1" short="1" />
      </div>

      <div className="section-block future-of-living">
        <FutureOfLivingSection />
      </div>

      <div className="section-block experience-slider">
        <BetterHomeSlider />
      </div>

      <div className="section-block testimonial-section">
        <Testimonials />
      </div>

      <div className="section-block trust-wrapper">
        <TrustSignals />
      </div>



      <div className="section-block blog-section">
        <Blog />
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/905386807740"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="Chat on WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </>
  );
};

export default Home;
