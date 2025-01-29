import React from 'react';
import PoliciesPrivacy from '../../components/PrivacyPolicies/PrivacyPolicies';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

const PoliciesPrivacyPage = () => {
  return (
    <div className="camper-success-view bg-[#12123f]">
      <Navbar />      
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
