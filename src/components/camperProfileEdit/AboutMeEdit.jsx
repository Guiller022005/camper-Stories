// components/camperProfile/AboutMe.jsx
import React, { useState } from 'react';
import VideoPlayerEdit from './VideoPlayerEdit';
import styles from './styles/AboutMeEdit.module.css';
import AboutMeModal from './modals/AboutMeModal';

const AboutMeEdit = ({ videoUrl, about, camperInfoInitialData, onUpdate }) => {


  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <div className={styles.colVideo}>
        <VideoPlayerEdit videoUrl={aboutData.videoUrl} title="Historia Camper" />
        </div>
        <div className={styles.colInfo}>
          <h2 className={styles.aboutSubtitle}>Acerca de
            <AboutMeModal initialData={camperInfoInitialData} onUpdate={onUpdate}/>
          </h2>
          <p>{about}</p>
          <button className={styles.btnPatrocinar}>Patrocinar</button>
        </div>
      </div>
    </section>
  );
};

export default AboutMeEdit;