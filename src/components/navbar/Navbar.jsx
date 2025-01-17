// Navbar.jsx
import React, { useState } from 'react';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';
import useScrollDirection from '../../hooks/useScrollDirection';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollDirection, isInCampersSection } = useScrollDirection();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const DesktopNav = () => (
    <div className="max-w-7xl mx-auto flex justify-center items-center gap-5">
      <div className="flex gap-8">
        <a href="#mainCampers" onClick={handleLinkClick} className="text-white hover:text-blue-400">
          Inicio
        </a>
        <a href="#campers" onClick={handleLinkClick} className="text-white hover:text-blue-400">
          Historias
        </a>
      </div>
      <div className="mx-5">
        <a href="#mainCampers" onClick={handleLinkClick}>
          <img src={campusLogo} alt="Campus Logo" className="h-[70px] w-auto" />
        </a>
      </div>
      <div className="flex gap-8">
        <a href="#campersGrid" onClick={handleLinkClick} className="text-white hover:text-blue-400">
          Campers
        </a>
        <a href="#formSection" onClick={handleLinkClick} className="text-white hover:text-blue-400">
          Donar
        </a>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="flex justify-between items-center px-5 py-0">
      <a href="#mainCampers" onClick={handleLinkClick}>
        <img src={campusLogoCompleto} alt="Campus Logo" className="w-[180px] h-auto relative z-[1001]" />
      </a>
      <button
        className="relative z-[1000] w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          // Icono X para cerrar
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45"></span>
            <span className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45"></span>
          </div>
        ) : (
          // Icono de hamburguesa
          <div className="flex flex-col justify-between w-6 h-5">
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
          </div>
        )}
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0C0C74] flex justify-center items-center z-[999]">
          <div className="flex flex-col gap-6 text-center w-full px-4">
            <a href="#mainCampers" onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors duration-300 text-lg py-3">
              Inicio
            </a>
            <a href="#campers" onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors duration-300 text-lg py-3">
              Historias
            </a>
            <a href="#campersGrid" onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors duration-300 text-lg py-3">
              Campers
            </a>
            <a href="#formSection" onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors duration-300 text-lg py-3">
              Donar
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`text-white p-3 shadow-md sticky top-0 z-[1000] transition-transform duration-300 w-full
      ${isMenuOpen ? 'fixed bg-[#0C0C74]' : 'bg-transparent backdrop-blur'}
      ${isInCampersSection && scrollDirection === 'down' && !isMenuOpen ? '-translate-y-full' : ''}`}>
      <div className="hidden md:block"><DesktopNav /></div>
      <div className="block md:hidden"><MobileNav /></div>
    </nav>
  );
};

export default Navbar;