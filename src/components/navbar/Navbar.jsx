import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import campusLogo from "../../assets/campus.svg";
import campusLogoCompleto from "../../assets/CampusLogo.png";
import { Button } from "@/components/ui/button";

const Navbar = ({ viewType, links }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determinar estilos según `viewType`
  const isLanding = viewType === "landing";

  const navbarStyles = isLanding
    ? `text-white p-3 top-0 z-20 transition-transform duration-300 shadow-lg border-b bg-[#27247a] border-indigo-700/30 backdrop-filter ${
        isMenuOpen ? "fixed bg-[#27247a]" : "bg-[#27247a] backdrop-blur-sm"
      } w-full`
    : `text-white p-3 fixed top-0 left-0 right-0 z-[1000] w-full font-inter ${
        isMenuOpen ? "bg-[#070727]" : "bg-[#070727]/20 backdrop-blur-md"
      } shadow-lg transition-colors duration-300 ease-in-out`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "" : "hidden";
  };

  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link.id || link.href);
    } else {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };  

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Componente de Links (Reutilizable)
  const NavLinks = ({ links }) =>
    links.map((link) => (
      <Link
        key={link.href || link.id}
        to={link.href || `#${link.id}`}
        onClick={handleLinkClick}
        className="text-white text-lg py-3 hover:text-blue-400 transition"
      >
        {link.label}
      </Link>
    ));

  // Navbar Escritorio (lg+)
  const DesktopNav = () => (
    <div className="max-w-[70vw] mx-auto flex justify-between items-center">
      <div className="flex items-center gap-10">
        <Link to="/">
          <img src={campusLogo} alt="Campus Logo" className="h-[85px] w-auto" />
        </Link>
        <nav className="flex gap-10 text-[18px]">
          <NavLinks links={links} />
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

  // Navbar para Móviles (sm - md)
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
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-full h-0.5 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </button>
      {isMenuOpen && (
        <div className={`fixed inset-0 bg-[#0C0C74] flex flex-col justify-center items-center z-[999]`}>
          <NavLinks links={links} />
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

  // Navbar para Tabletas (md - lg)
  const TabletNav = () => (
    <div className="flex justify-between items-center max-w-[90vw] mx-auto px-10">
      <Link to="/" aria-label="Inicio" className="mr-14">
        <img src={campusLogoCompleto} alt="Campus Logo" className="h-[70px] w-auto" />
      </Link>
      <nav className="flex gap-x-6 text-[18px]">
        <NavLinks links={links} />
      </nav>
      <button onClick={toggleMenu} className="md:hidden block relative z-10 w-8 h-8">
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-full h-0.5 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-full h-0.5 bg-white transform transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </button>
    </div>
  );

  return (
    <nav className={navbarStyles}>
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
