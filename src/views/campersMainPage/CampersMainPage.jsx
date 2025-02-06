import React from 'react';
import MainCampers from '../../components/campersMainPage/MainCampers';
import Campers from '../../components/campersMainPage/Campers';
import CampersGrid from '../../components/campersMainPage/CampersGrid';
import FormSection from '../../components/campersMainPage/FormSection';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import "./styles/CampersMainPage.css";
import HeroSection from '@/components/campersMainPage/HeroSection';

const CampersMainPage = () => {
  const navigateToSection = (sectionId) => {
    const basePath = isEditPage
      ? `/campers/profile/${id}/edit`
      : `/campers/profile/${id}`;

    navigate(basePath);

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };
  return (
    <div className="camper-success-view">
      <Navbar 
        viewType="landing"
        links={[
          { href: "/#inicio", label: "Inicio" },
          { href: "/#campers-exitosos", label: "Historias" },
          { href: "/#campers-formacion", label: "Campers" },
          { href: "/#donar", label: "Donar" }
        ]}
        onLinkClick={navigateToSection}
      />
      <section id="inicio">
        <HeroSection />  
      </section>      
      {/* <section id="mainCampers">
        <MainCampers />
      </section>       */}
      <section id="campers-exitosos">
        <Campers />
      </section>
      <section id="campers-formacion">
        <CampersGrid />
      </section>
      <section id="donar">
        <FormSection />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default CampersMainPage;
