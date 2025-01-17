import React, { useState } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import campusLogo from '../../assets/campus.svg';
import campusLogoCompleto from '../../assets/CampusLogo.png';

const NavbarProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID del camper desde la URL
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determinar si estamos en la vista de edición o no
  const isEditPage = location.pathname.includes('edit');

  const navigateToSection = (sectionId) => {
    // Verificar si estamos en modo edición y construir la ruta base
    const basePath = isEditPage
      ? `/campers/profile/${id}/edit`
      : `/campers/profile/${id}`;

    // Navegar a la ruta correspondiente
    navigate(basePath);

    // Desplazar a la sección específica después de un pequeño retraso
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Esperar a que la navegación termine
  };

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
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const DesktopNav = () => (
    <div className="max-w-7xl mx-auto flex justify-center items-center gap-5">
      <div className="flex gap-8">
        <button
          onClick={() => navigateToSection('sobre-mi')}
          className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Sobre mi
        </button>
        <button
          onClick={() => navigateToSection('proceso-formacion')}
          className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Proceso
        </button>
        <button
          onClick={() => navigateToSection('sueños-grid')}
          className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Sueños
        </button>
      </div>
      <div className="mx-5">
        <Link to="/">
          <img src={campusLogo} alt="Campus Logo" className="h-[70px] w-auto mx-5" />
        </Link>
      </div>
      <div className="flex gap-8">
        <button
          onClick={() => navigateToSection('projects')}
          className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Proyectos
        </button>
        <button
          onClick={handleSponsorClick}
          className="text-white hover:text-blue-400 bg-transparent border-none cursor-pointer text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Patrocinar
        </button>
        <a
          href="https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 text-base font-semibold tracking-wide py-2 px-1 capitalize"
        >
          Contactanos
        </a>
      </div>
    </div>
  );

  const MobileNav = () => (
    <div className="flex justify-between items-center px-5 py-0">
      <Link to="/">
        <img src={campusLogoCompleto} alt="Campus Logo" className="w-[180px] h-auto relative z-[1001]" />
      </Link>
      <button
      className={`relative w-8 h-8 pt-2 flex flex-col justify-center items-center focus: focus:ring-0 focus-visible:ring-0 focus-visible:outline-none active:outline-none select-none touch-none -translate-y-1 z-[1001]`}
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
        <div className="fixed inset-0 bg-[#070727] flex justify-center items-center z-[999]">
          <div className="flex flex-col gap-6 text-center w-[90%] max-w-[300px] m-8">
            <button
              onClick={() => {
                navigateToSection('sobre-mi');
                toggleMenu();
              }}
              className="text-white hover:text-blue-400 text-lg py-3 bg-transparent border-none cursor-pointer font-semibold tracking-wide capitalize w-full"
            >
              Sobre mi
            </button>
            <button
              onClick={() => {
                navigateToSection('proceso-formacion');
                toggleMenu();
              }}
              className="text-white hover:text-blue-400 text-lg py-3 bg-transparent border-none cursor-pointer font-semibold tracking-wide capitalize w-full"
            >
              Proceso
            </button>
            <button
              onClick={() => {
                navigateToSection('sueños-grid');
                toggleMenu();
              }}
              className="text-white hover:text-blue-400 text-lg py-3 bg-transparent border-none cursor-pointer font-semibold tracking-wide capitalize w-full"
            >
              Sueños
            </button>
            <button
              onClick={() => {
                navigateToSection('projects');
                toggleMenu();
              }}
              className="text-white hover:text-blue-400 text-lg py-3 bg-transparent border-none cursor-pointer font-semibold tracking-wide capitalize w-full"
            >
              Proyectos
            </button>
            <button
              onClick={() => {
                handleSponsorClick();
                toggleMenu();
              }}
              className="text-white hover:text-blue-400 text-lg py-3 bg-transparent border-none cursor-pointer font-semibold tracking-wide capitalize w-full"
            >
              Patrocinar
            </button>
            <a
              href="https://wa.me/+573123456789?text=Hola,%20me%20interesa%20obtener%20más%20información"
              className="text-white hover:text-blue-400 text-lg py-3 font-semibold tracking-wide capitalize w-full"
            >
              Contactanos
            </a>
          </div>
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
