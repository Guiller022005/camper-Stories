  import React from 'react';
  import "./styles/Footer.css";

  const Footer = () => {
    return (
      <footer className="footer">

        <div className='footer-container'>
          <img src="src/assets/CampusLogo.png" alt="Campuslands" />
          <div className='line'></div>
          <div className='underline-content'>
            <p>© Campus 2024 - Todos los derechos Reservados</p>
            <div className='social-logos'>
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
