import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SponsorCTA = () => {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    navigate('/'); 
    setTimeout(() => {
      const section = document.getElementById('sponsro');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    // Aquí puedes agregar lógica adicional si es necesario
  }, [navigate]);

  return (
    <section className="flex flex-col items-center mt-8 p-8 gap-4 text-center">
      <p className="text-white text-[clamp(1rem,_1.5vw,_1.2rem)] max-w-[800px] mx-auto">
        "Con tu apoyo, puedo continuar desarrollando habilidades y creando soluciones innovadoras. ¡Gracias por creer en mi potencial!"
      </p>
      <button
        className="flex items-center bg-[#f7b500] text-black font-poppins font-semibold uppercase rounded-[20px] transition-all ease-in-out duration-300 text-[clamp(1rem,_1.5vw,_1.5rem)] py-[clamp(8px,_2vw,_15px)] px-[clamp(16px,_3vw,_40px)] border-none hover:bg-[#cc7a00] cursor-pointer"
        onClick={handleSponsorClick}
      >
        Patrocinar Ahora
      </button>
    </section>
  );
};

export default SponsorCTA;
