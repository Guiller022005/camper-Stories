import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleRegisterClick = () => {
    navigate("/register");
  }

  const links = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#campers-exitosos", label: "Historias" },
    { href: "/#campers-formacion", label: "Campers" },
    { href: "/#donar", label: "Donar" }
  ];

  // Navbar para Escritorio
  const DesktopNav = () => (
    <div className="max-w-[70vw] mx-auto flex justify-between items-center">
      <div className="flex items-center gap-10">
        <a href="/" onClick={handleLinkClick} aria-label="Inicio">
          <img src={campusLogo} alt="Campus Logo" className="h-[85px] w-auto" />
        </a>
        <nav className="flex gap-10 text-[18px]">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <Button onClick={handleRegisterClick} size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4]">
          Registrate
        </Button>
        <Button onClick={handleLoginClick} size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]">
          Inicia Sesión
        </Button>
      </div>
    </div>
  );

  // Navbar para Móviles (hasta `md`)
  const MobileNav = () => (
    <div className="flex justify-between items-center px-5">
      <a href="#mainCampers" onClick={handleLinkClick} aria-label="Inicio">
        <img src={campusLogoCompleto} alt="Campus Logo" className="w-[150px] h-auto relative z-10" />
      </a>
      <button
        className="relative z-10 w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0C0C74] flex flex-col justify-center items-center z-50">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-white text-lg py-3 hover:text-blue-400 transition">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  // Navbar para Tabletas (`md` a `lg`)
  const TabletNav = () => (
    <div className="flex justify-between items-center max-w-[90vw] mx-auto px-10">
      {/* Logo con margen derecho para separarlo de los enlaces */}
      <a href="#mainCampers" onClick={handleLinkClick} aria-label="Inicio" className="mr-14">
        <img src={campusLogoCompleto} alt="Campus Logo" className="h-[70px] w-auto" />
      </a>
      {/* Sección de enlaces con más espacio */}
      <nav className="flex gap-x-6 text-[18px]">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-white hover:text-blue-400 transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
      <button onClick={toggleMenu} className="md:hidden block relative z-10 w-8 h-8">
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>
    </div>
  );  

  return (
    <nav
      className={`text-white p-3 top-0 z-20 transition-transform duration-300 shadow-lg border-b bg-[#27247a] border-indigo-700/30 backdrop-filter
        ${isMenuOpen ? 'fixed bg-[#27247a]' : 'bg-[#27247a] backdrop-blur-sm'}  w-full`}
    >
      <div className="block md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:flex lg:hidden">
        <TabletNav />
      </div>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
    </nav>
  );
};

export default Navbar;
