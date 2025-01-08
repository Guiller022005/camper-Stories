// components/camperProfile/AboutMe.jsx
import React from 'react';
import VideoPlayer from './VIdeoPlayer';
import styles from './styles/AboutMe.module.css';

const AboutMe = ({ videoUrl, about }) => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <div className={styles.colVideo}>
          <VideoPlayer videoUrl={videoUrl} title="Historia Camper" />
        </div>
        <div className={styles.colInfo}>
          <h2 className={styles.aboutSubtitle}>Acerca de</h2>
          <p>{about}</p>
          <button className={styles.btnPatrocinar}>Patrocinar</button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;