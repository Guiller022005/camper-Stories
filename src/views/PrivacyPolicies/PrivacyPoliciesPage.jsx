import React from 'react';
import PoliciesPrivacy from '../../components/PrivacyPolicies/PrivacyPolicies';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

const PoliciesPrivacyPage = () => {

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
    <div className="camper-success-view bg-[#12123f]">
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
      <section id="policiesPrivacy">
        <PoliciesPrivacy />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default PoliciesPrivacyPage;
