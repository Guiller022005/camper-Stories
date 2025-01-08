// components/camperProfile/AboutMe.jsx
import React from 'react';
import VideoPlayerEdit from './VideoPlayerEdit';
import styles from './styles/AboutMeEdit.module.css';
import AboutMeModal from './modals/AboutMeModal';

const AboutMeEdit = ({ videoUrl, about, camperInfoInitialData }) => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <div className={styles.colVideo}>
          <VideoPlayerEdit videoUrl={videoUrl} title="Historia Camper" />
        </div>
        <div className={styles.colInfo}>
          <h2 className={styles.aboutSubtitle}>Acerca de
            <AboutMeModal initialData={camperInfoInitialData}/>
          </h2>
          <p>{about}</p>
          <button className={styles.btnPatrocinar}>Patrocinar</button>
        </div>
      </div>
    </section>
  );
};

export default AboutMeEdit;