import React, { useState } from 'react';
import './styles/NavbarProfile.css';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';

const NavbarProfile = () => {
 // URL para WhatsApp con mensaje predefinido
 const whatsappUrl = "https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información";
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen);
 };

 const handleLinkClick = () => {
   setIsMenuOpen(false);
 };

 const DesktopNav = () => (
   <div className="desktop-nav-profile">
     <div className="nav-links-profile left-group-profile">
       <a href="#sobre-mi-profile" onClick={handleLinkClick}>Sobre mi</a>
       <a href="#proceso-formacion-profile" onClick={handleLinkClick}>Proceso</a>
       <a href="#sueños-grid-CamperProfile" onClick={handleLinkClick}>Sueños</a>
     </div>
     <div className="nav-logo-profile">
       <a href="/" onClick={handleLinkClick}>
         <img src={campusLogo} alt="Campus Logo" />
       </a>
     </div>
     <div className="nav-links-profile right-group-profile">
       <a href="#projects-profile" onClick={handleLinkClick}>Proyectos</a>
       <a href="#patrocinar-profile" onClick={handleLinkClick}>Patrocinar</a>
       <a href={ whatsappUrl } target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Contactanos</a>
     </div>
   </div>
 );

 const MobileNav = () => (
   <div className="mobile-nav-profile">
     <a href="/" onClick={handleLinkClick}>
       <img src={campusLogoCompleto} alt="Campus Logo" className="mobile-logo-profile" />
     </a>
     <button 
       className={`hamburger-menu-profile ${isMenuOpen ? 'is-active' : ''}`} 
       onClick={toggleMenu}
     >
       <span className="hamburger-icon-profile"></span>
     </button>
     {isMenuOpen && (
       <div className="mobile-menu-profile">
         <div className="mobile-links-profile">
           <a href="#sobre-mi-profile" onClick={handleLinkClick}>Sobre mi</a>
           <a href="#proceso-formacion-profile" onClick={handleLinkClick}>Proceso</a>
           <a href="#no-esta" onClick={handleLinkClick}>Sueños</a>
           <a href="#projects-profile" onClick={handleLinkClick}>Proyectos</a>
           <a href="#patrocinar-profile" onClick={handleLinkClick}>Patrocinar</a>
           <a href={ whatsappUrl } onClick={handleLinkClick}>Contactanos</a>
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