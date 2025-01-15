import React from 'react';
import styles from './styles/DreamsEdit.module.css';
import DreamsGridEdit from './DreamsGridEdit';

const DreamsEdit = ({onUpdate}) => {
  return (
    <section className={styles.dreams}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Sueños
      </h2>
      <div className={styles.dreamsGridContainer} >
        <DreamsGridEdit onUpdate={onUpdate}/>
      </div>
    </section>
  );
};

export default DreamsEdit;