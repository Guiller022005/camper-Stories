import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useScrollDirection from '../../hooks/useScrollDirection'; // Importa el hook
import './styles/NavbarProfile.css';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';

const NavbarProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isInCampersSection } = useScrollDirection(); // Hook personalizado

  const handleSponsorClick = () => {
    const scrollToSponsor = () => {
      const section = document.getElementById('sponsro');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname === '/') {
      // Si ya estamos en la página principal
      scrollToSponsor();
    } else {
      // Navegar primero y luego desplazarse
      navigate('/');
      setTimeout(scrollToSponsor, 500); // Tiempo para que la página cargue
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const DesktopNav = () => (
    <div className="desktop-nav-profile">
      <div className="nav-links-profile left-group-profile">
        <button onClick={() => navigate('/sobre-mi')} className="nav-link">
          Sobre mi
        </button>
        <button onClick={() => navigate('/proceso-formacion')} className="nav-link">
          Proceso
        </button>
        <button onClick={() => navigate('/sueños-grid')} className="nav-link">
          Sueños
        </button>
      </div>
      <div className="nav-logo-profile">
        <Link to="/" className="logo-link">
          <img src={campusLogo} alt="Campus Logo" />
        </Link>
      </div>
      <div className="nav-links-profile right-group-profile">
        <button onClick={() => navigate('/projects')} className="nav-link">
          Proyectos
        </button>
        <button onClick={handleSponsorClick} className="nav-link">
          Patrocinar
        </button>
        <a
          href="https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          Contactanos
        </a>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="mobile-nav-profile">
      <Link to="/" className="logo-link">
        <img src={campusLogoCompleto} alt="Campus Logo" className="mobile-logo-profile" />
      </Link>
      <button
        className={`hamburger-menu-profile ${isMenuOpen ? 'is-active' : ''}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-icon-profile"></span>
      </button>
      {isMenuOpen && (
        <div className="mobile-menu-profile">
          <div className="mobile-links-profile">
            <button onClick={() => navigate('/sobre-mi')} className="nav-link">
              Sobre mi
            </button>
            <button onClick={() => navigate('/proceso-formacion')} className="nav-link">
              Proceso
            </button>
            <button onClick={() => navigate('/sueños-grid')} className="nav-link">
              Sueños
            </button>
            <button onClick={() => navigate('/projects')} className="nav-link">
              Proyectos
            </button>
            <button onClick={handleSponsorClick} className="nav-link">
              Patrocinar
            </button>
            <a
              href="https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información"
              className="nav-link"
            >
              Contactanos
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={`navbar-profile ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="desktop-only-profile"><DesktopNav /></div>
      <div className="mobile-only-profile"><MobileNav /></div>
    </nav>
  );
};

export default NavbarProfile;
