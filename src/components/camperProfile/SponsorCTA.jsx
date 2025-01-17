import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/SponsorCTA.module.css';

const SponsorCTA = () => {
  const navigate = useNavigate();

  // Definir la función handleSponsorClick en el nivel superior para que esté disponible para el botón
  const handleSponsorClick = () => {
    navigate('/'); // Navega a la página de inicio
    setTimeout(() => {
      const section = document.getElementById('sponsro'); // ID correcto sin '#'
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Desplázate suavemente a la sección
      }
    }, 100); // Tiempo para permitir que la página de inicio cargue completamente
  };

  useEffect(() => {
    // Si necesitas ejecutar alguna lógica adicional basada en el cambio de ruta, puedes incluirla aquí
  }, [navigate]);

  return (
    <section className={styles.sponsorCallToAction}>
      <p className={styles.ctaText}>
        "Con tu apoyo, puedo continuar desarrollando habilidades y creando soluciones innovadoras. ¡Gracias por creer en mi potencial!"
      </p>
      <button 
        className={styles.btnSponsor} 
        onClick={handleSponsorClick} // Vincular la función correctamente al botón
      >
        Patrocinar Ahora
      </button>
    </section>
  );
};

export default SponsorCTA;
