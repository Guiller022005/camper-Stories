import React from 'react';
import TermsConditions from '../../components/termsCondition/termsAndCondition';
import Footer from '../../components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';

const termsAndCondicions = () => {
  return (
    <div>
      <Navbar />      
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
