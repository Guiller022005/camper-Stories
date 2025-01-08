import React from 'react';
import MainCampers from '../../components/campersMainPage/MainCampers';
import Campers from '../../components/campersMainPage/Campers';
import CampersGrid from '../../components/campersMainPage/CampersGrid';
import FormSection from '../../components/campersMainPage/FormSection';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import "./styles/CampersMainPage.css";

const CampersMainPage = () => {
  return (
    <div className="camper-success-view">
      <Navbar />      
      <section id="mainCampers">
        <MainCampers />
      </section>      
      <section id="campers">
        <Campers />
      </section>
      <section id="campersGrid">
        <CampersGrid />
      </section>
      <section id="formSection">
        <FormSection />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default CampersMainPage;
