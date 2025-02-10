import React from 'react';
import TermsConditions from '../../components/termsCondition/termsAndCondition';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

const termsAndCondicions = () => {

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
    <div>
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
      <section id="TermsConditions">
        <TermsConditions />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default termsAndCondicions;
