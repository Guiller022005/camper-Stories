import React from 'react';
import styles from './styles/SponsorCTA.module.css';

const SponsorCTA = () => {
  return (
    <section className={styles.sponsorCallToAction}>
      <p className={styles.ctaText}>
        "Con tu apoyo, puedo continuar desarrollando habilidades y creando soluciones innovadoras. ¡Gracias por creer en mi potencial!"
      </p>
      <button className={styles.btnSponsor}>Patrocinar Ahora</button>
    </section>
  );
};

export default SponsorCTA;