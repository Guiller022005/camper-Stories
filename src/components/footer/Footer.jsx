import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Footer = () => {
  return (
    <footer className="text-center text-white text-[1rem] py-10 px-6 bg-[#0C0C74] relative z-10">
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

        {/* Texto y redes sociales */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
          {/* Texto */}
          <div className="flex flex-col md:flex-row gap-4">
            <p className="text-[14px] sm:text-[16px] font-[400] font-mono text-center md:text-left">
              © Campus 2024 - Todos los derechos Reservados
            </p>
            <p className="hidden md:block">|</p>
            <p><b>Camper Stories v0.5.0</b></p>
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
