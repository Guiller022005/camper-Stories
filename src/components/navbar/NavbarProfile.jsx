import React, { useState } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const NavbarProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isEditPage = location.pathname.includes('edit');

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const navigateToSection = (sectionId) => {
    const basePath = isEditPage
      ? `/campers/profile/${id}/edit`
      : `/campers/profile/${id}`;

    navigate(basePath);

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const handleLoginClick = () => {
    navigate("/sponsors/login");
  }

  const handleRegisterClick = () => {
    toast.info("Esta pagina se encuenta en desarrollo. Vuelve Pronto!")
  }

  const links = [
    { id: 'sobre-mi', label: "Sobre mi" },
    { id: 'proceso-formacion', label: "Proceso" },
    { id: 'sueños-grid', label: "Sueños" },
    { id: 'projects', label: "Proyectos" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const DesktopNav = () => (
    <div className="max-w-[70vw] mx-auto flex justify-between items-center">
      <div className="flex items-center gap-10">
        <Link to="/">
          <img src={campusLogo} alt="Campus Logo" className="h-[85px] w-auto" />
        </Link>
        <nav className="flex gap-10 text-[18px]">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateToSection(link.id)}
              className="text-white hover:text-blue-400 transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
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

  const MobileNav = () => (
    <div className="flex justify-between items-center px-5">
      <Link to="/">
        <img src={campusLogoCompleto} alt="Campus Logo" className="w-[180px] h-auto relative z-[1001]" />
      </Link>
      <button
        className="relative z-[1001] w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
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
        <div className="fixed inset-0 bg-[#070727] flex flex-col justify-center items-center z-[999]">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateToSection(link.id);
                handleLinkClick();
              }}
              className="text-white text-lg py-3 hover:text-blue-400 transition bg-transparent border-none cursor-pointer w-full"
            >
              {link.label}
            </button>
          ))}
          <Button size="lg" className="text-lg bg-transparent hover:bg-[#4c47b4]">
            Registrate
          </Button>
          <Button size="lg" className="text-lg bg-[#4c47b4] hover:bg-[#615cc2]">
            Inicia Sesión
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <nav
      className={`text-white p-3 fixed top-0 left-0 right-0 z-[1000] w-full font-inter 
        ${isMenuOpen
          ? 'bg-[#070727]'
          : 'bg-[#070727]/20 backdrop-blur-md'
        }
        shadow-lg transition-colors duration-300 ease-in-out`}
    >
      <div className="hidden md:block"><DesktopNav /></div>
      <div className="block md:hidden"><MobileNav /></div>
    </nav>
  );
};

export default NavbarProfile;