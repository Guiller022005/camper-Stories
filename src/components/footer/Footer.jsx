import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Footer = () => {
  return (
    <footer className="text-center text-white text-[1rem] py-[5rem] px-[6rem] bg-[#0C0C74] relative z-10">
      <div className="flex flex-col items-start">
        <LazyLoadImage
          src="https://camper-stories.s3.us-east-2.amazonaws.com/CampusLogo.png"
          alt="Campuslands"
          effect="blur"
          className="w-[15%] pb-[0.5rem]"
        />
        <div className="w-full h-[2px] bg-white mb-[6px]"></div>
        <div className="flex justify-between items-center w-full">
          <p className="px-[1rem] pb-[0.5rem] text-[16px] font-[400] font-mono">
            © Campus 2024 - Todos los derechos Reservados | <b>Camper Stories v0.4.5</b>
          </p>
          <div className="flex gap-[1.5rem] p-[0.7rem] text-[25px] sm:text-[20px]">
            <a href="https://www.facebook.com/Campuslands/" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-200 hover:scale-[1.3]">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/campuslands/" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-200 hover:scale-[1.3]">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/company/campuslands/" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-200 hover:scale-[1.3]">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="https://www.youtube.com/@campuslands" target="_blank" rel="noopener noreferrer" className="text-white transition-transform duration-200 hover:scale-[1.3]">
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
