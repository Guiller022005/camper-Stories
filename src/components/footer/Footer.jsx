import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <LazyLoadImage
          src="https://camper-stories.s3.us-east-2.amazonaws.com/CampusLogo.png"
          alt="Campuslands"
          effect="blur"
          className="footer-logo"
        />
        <div className="line"></div>
        <div className="underline-content">
          <p>© Campus 2024 - Todos los derechos Reservados</p>
          <div className="social-logos">
            <a href="https://www.facebook.com/Campuslands/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/campuslands/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/company/campuslands/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="https://www.youtube.com/@campuslands" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
