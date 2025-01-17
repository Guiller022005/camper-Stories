import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VIdeoPlayer';
import styles from './styles/AboutMe.module.css';

const AboutMe = ({ videoUrl, about }) => {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    if (location.pathname === '/') {
      // Si ya estás en la página de inicio, realiza el desplazamiento
      const section = document.getElementById('sponsro');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si no estás en la página de inicio, navega y luego desplázate
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById('sponsro');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Tiempo para asegurar que la página cargue
    }
  };

  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <div className={styles.colVideo}>
          <VideoPlayer videoUrl={videoUrl} title="Historia Camper" />
        </div>
        <div className={styles.colInfo}>
          <h2 className={styles.aboutSubtitle}>Acerca de</h2>
          <p>{about}</p>
          <button 
            className={styles.btnPatrocinar} 
            onClick={handleSponsorClick}
          >
            Patrocinar
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;