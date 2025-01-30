import React, { useState } from 'react';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';
import useScrollDirection from '../../hooks/useScrollDirection';
import { GraduationCap, Users, Building2, Play, Rocket, Target, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollDirection, isInCampersSection } = useScrollDirection();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const links = [
    { href: "#mainCampers", label: "Inicio" },
    { href: "#campers", label: "Historias" },
    { href: "#campersGrid", label: "Campers" },
    { href: "#formSection", label: "Donar" }
  ];

  const DesktopNav = () => (
    <div className="max-w-[70vw] mx-auto flex justify-between items-center">
      <div className="flex items-center gap-10">
        <a href="#mainCampers" onClick={handleLinkClick} aria-label="Inicio">
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
        <Button size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4]">
          Registrate
        </Button>
        <Button size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]">
          Inicia Sesión
        </Button>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="flex justify-between items-center px-5">
      <a href="#mainCampers" onClick={handleLinkClick} aria-label="Inicio">
        <img src={campusLogoCompleto} alt="Campus Logo" className="w-[180px] h-auto relative z-10" />
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

  return (
    <nav
      className={`text-white p-3 top-0 z-20 transition-transform duration-300 shadow-lg border-b bg-[#27247a] border-indigo-700/30 backdrop-filter
        ${isMenuOpen ? 'fixed bg-[#27247a]' : 'bg-[#27247a] backdrop-blur-sm'} 
        ${isInCampersSection && scrollDirection === 'down' && !isMenuOpen ? '-translate-y-full' : ''} 
        w-full`}
    >
      <div className="hidden md:block">
        <DesktopNav />
      </div>
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
