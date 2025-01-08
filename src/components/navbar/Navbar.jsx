// Navbar.jsx
import React, { useState } from 'react';
import './styles/Navbar.css';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';
import useScrollDirection from '../../hooks/useScrollDirection';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollDirection, isInCampersSection } = useScrollDirection();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  const DesktopNav = () => (
    <div className="desktop-nav">
      <div className="nav-links left-group">
        <a href="#mainCampers" onClick={handleLinkClick}>Inicio</a>
        <a href="#campers" onClick={handleLinkClick}>Historias</a>
      </div>
      <div className="nav-logo">
        <a href="#mainCampers" onClick={handleLinkClick}>
          <img src={campusLogo} alt="Campus Logo" />
        </a>
      </div>
      <div className="nav-links right-group">
        <a href="#campersGrid" onClick={handleLinkClick}>Campers</a>
        <a href="#formSection" onClick={handleLinkClick}>Donar</a>
      </div>
    </div>
  );
  
  const MobileNav = () => (
    <div className="mobile-nav">
      <a href="#mainCampers" onClick={handleLinkClick}>
        <img src={campusLogoCompleto} alt="Campus Logo" className="mobile-logo" />
      </a>
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'is-active' : ''}`} 
        onClick={toggleMenu}
      >
        <span className="hamburger-icon"></span>
      </button>
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-links">
            <a href="#mainCampers" onClick={handleLinkClick}>Inicio</a>
            <a href="#campers" onClick={handleLinkClick}>Historias</a>
            <a href="#campersGrid" onClick={handleLinkClick}>Campers</a>
            <a href="#formSection" onClick={handleLinkClick}>Donar</a>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''} ${
      isInCampersSection && scrollDirection === 'down' && !isMenuOpen ? 'navbar-hidden' : ''
    }`}>
      <div className="desktop-only"><DesktopNav /></div>
      <div className="mobile-only"><MobileNav /></div>
    </nav>
  );
};

export default Navbar;