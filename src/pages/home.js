import React from 'react';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';
import Experience from '../components/Experience/Experience';
import Blog from '../components/blog/blog';
import { useTranslation } from 'react-i18next';



const Home = () => {

      const { t, i18n } = useTranslation();
  return (

        <>
        <Hero heading={t('heroMessage')} subheading={t('heroSubtitle')}/>
        {/* <SearchBar /> */}
        <br></br>
        <PropertyList title="Featured Listings" tabs="0" maps="1" tags="1"/>
        <br></br>
        <PropertyList title="Perfect Locations" tabs="1" maps="0" tags="0"/>
         <Experience />
        <Testimonials />
        <Blog />


        </>

  );
};

export default Home;