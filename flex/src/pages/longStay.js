import React from 'react';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';
import FAQ from '../components/FAQ/FAQ'
import LifeTimeExperience from '../components/LongTermStay/experience/LifestyleSection'
import Hero from '../components/LongTermStay/Hero/StyledHero'
import { useTranslation } from 'react-i18next';

const LongStay = () => {
        const { t, i18n } = useTranslation();
  return (

        <>
            <Hero heading={t('LongheroMessage')} subheading={t('LongheroSubtitle')}/>
            <br></br>
            <PropertyList title="Long Term Stay Locations" tabs="0" maps="0" tags="0" short="0"/>
            <LifeTimeExperience />
            <Testimonials />
            <FAQ />
        </>

  );
};

export default LongStay;