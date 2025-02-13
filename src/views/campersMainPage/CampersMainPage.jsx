import React from 'react';
import MainCampers from '../../components/campersMainPage/MainCampers';
import Campers from '../../components/campersMainPage/Campers';
import CampersGrid from '../../components/campersMainPage/CampersGrid';
import FormSection from '../../components/campersMainPage/FormSection';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import HeroSection from '@/components/campersMainPage/HeroSection';
import { useCampus } from '../../components/campersMainPage/context/CampusContext'; // Importa el hook del contexto
import "./styles/CampersMainPage.css";

const CampersMainPage = () => {
  const { currentCampusId } = useCampus(); // Obtiene el estado del campus desde el contexto

  const navigateToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Pequeño delay para asegurar el renderizado
  };


  console.log("Campus Seleccionado:", currentCampusId); // Para verificar que el estado cambia correctamente

  return (
    <div className="camper-success-view">
      <Navbar
        viewType="landing"
        links={[
          { href: "#inicio", label: "Inicio" },
          { href: "#campers-exitosos", label: "Historias" },
          { href: "#campers-formacion", label: "Campers" },
          { href: "#donar", label: "Donar" },
          { href: "#", label: "Sedes"}
        ]}
        onLinkClick={navigateToSection}
      />


      <section id="inicio">
        <HeroSection />
      </section>
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
