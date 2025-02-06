import React from 'react';
import DreamsGrid from './DreamsGrid';

const Dreams = ({ isEditable, onUpdate }) => {

  return (
    <section className="mb-8">
      <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,3rem)] mb-4 mt-4 relative z-10">
        <span className="text-[#FACC15] font-bold">&lt;/</span> Mis Sueños
      </h2>
      <div className="w-full">
        <DreamsGrid onUpdate={onUpdate} isEditable={isEditable} />
      </div>
    </section>
  );
};

export default Dreams;
