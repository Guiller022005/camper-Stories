import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './styles/NavbarProfile.css';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';

const NavbarProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const whatsappUrl = "https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información";

  useEffect(() => {
    setIsEditMode(location.pathname.includes('/edit'));
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigateAndScroll = (sectionId) => {
    // Extraer la ruta base actual (sin el hash)
    const currentPath = location.pathname;
    const baseUrl = isEditMode ? currentPath : currentPath.replace('/edit', '');
    
    // Si ya estamos en la página correcta, solo hacemos scroll
    if ((isEditMode && currentPath.includes('/edit')) || (!isEditMode && !currentPath.includes('/edit'))) {
      const targetElement = document.getElementById(sectionId + (isEditMode ? '-edit' : ''));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si necesitamos cambiar de página, primero navegamos y luego hacemos scroll
      const newPath = `${baseUrl}${sectionId}`;
      navigate(newPath);
      // Esperamos a que la navegación se complete antes de hacer scroll
      setTimeout(() => {
        const targetElement = document.getElementById(sectionId + (isEditMode ? '-edit' : ''));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    setIsMenuOpen(false);
  };

  const DesktopNav = () => (
    <div className="desktop-nav-profile">
      <div className="nav-links-profile left-group-profile">
        <button onClick={() => handleNavigateAndScroll('sobre-mi')} className="nav-link">
          Sobre mi
        </button>
        <button onClick={() => handleNavigateAndScroll('proceso-formacion')} className="nav-link">
          Proceso
        </button>
        <button onClick={() => handleNavigateAndScroll('sueños-grid')} className="nav-link">
          Sueños
        </button>
      </div>
      <div className="nav-logo-profile">
        <Link to="/" className="logo-link">
          <img src={campusLogo} alt="Campus Logo" />
        </Link>
      </div>
      <div className="nav-links-profile right-group-profile">
        <button onClick={() => handleNavigateAndScroll('projects')} className="nav-link">
          Proyectos
        </button>
        <button onClick={() => handleNavigateAndScroll('patrocinar')} className="nav-link">
          Patrocinar
        </button>
        <a 
          href={whatsappUrl} 
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
            <button onClick={() => handleNavigateAndScroll('sobre-mi')} className="nav-link">
              Sobre mi
            </button>
            <button onClick={() => handleNavigateAndScroll('proceso-formacion')} className="nav-link">
              Proceso
            </button>
            <button onClick={() => handleNavigateAndScroll('sueños-grid')} className="nav-link">
              Sueños
            </button>
            <button onClick={() => handleNavigateAndScroll('projects')} className="nav-link">
              Proyectos
            </button>
            <button onClick={() => handleNavigateAndScroll('patrocinar')} className="nav-link">
              Patrocinar
            </button>
            <a 
              href={whatsappUrl}
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