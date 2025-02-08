import React from "react";
import { Link } from "react-router-dom"; // Importar Link para navegación interna
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="text-center text-white text-[1rem] py-10 px-6 bg-[#27247a] relative z-10">
      <div className="flex flex-col items-center md:items-start">
        {/* Logo */}
        <LazyLoadImage
          src="https://camper-stories.s3.us-east-2.amazonaws.com/assets/CampusLogo.png"
          alt="Campuslands"
          effect="blur"
          className="w-[50%] sm:w-[30%] md:w-[15%] pb-4"
        />

        {/* Línea divisoria */}
        <div className="w-full h-[2px] bg-white mb-4"></div>

        {/* Texto y enlaces */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
          {/* Información general */}
          <div className="flex flex-col md:flex-row text-white gap-4 text-[14px] sm:text-[16px] font-[400] font-mono text-center md:text-left">
            <p>© Campus 2024 - Todos los derechos Reservados</p>
            <p className="hidden md:block">|</p>
            <p><b>Camper Stories v0.6.3 Beta</b></p>
            <p className="hidden md:block">|</p>
            {/* Enlace a Política de Privacidad */}
            <span
              onClick={() => navigate("/politica-de-privacidad")}
              className="hover:underline text-white transition-colors duration-200 cursor-pointer"
            >
              Política de privacidad
            </span>
            <p className="hidden md:block">|</p>
            {/* Enlace a Términos y Condiciones */}
            <span
              onClick={() => navigate("terminos-y-condiciones")}
              className="hover:underline text-white transition-colors duration-200 cursor-pointer"
            >
              Términos y Condiciones
            </span>
          </div>

          {/* Redes sociales */}
          <div className="flex justify-center md:justify-start gap-6 text-[20px] sm:text-[25px]">
            <a
              href="https://www.facebook.com/Campuslands/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform duration-200 hover:scale-[1.3]"
            >
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/campuslands/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform duration-200 hover:scale-[1.3]"
            >
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/campuslands/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform duration-200 hover:scale-[1.3]"
            >
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.youtube.com/@campuslands"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform duration-200 hover:scale-[1.3]"
            >
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
