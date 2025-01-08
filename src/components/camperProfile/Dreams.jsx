import React from 'react';
import DreamsGrid from './DreamsGrid';
import styles from './styles/Dreams.module.css';

const Dreams = () => {
  return (
    <section className={styles.dreams}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Sueños
      </h2>
      <div className={styles.dreamsGridContainer}>
        <DreamsGrid />
      </div>
    </section>
  );
};

export default Dreams;