import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Logo from '../../assets/Logo.png';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles/MainCampers.css';
import profiles from '../../services/camperProfile';
import VideoPlayer from "../../components/camperProfile/VIdeoPlayer";


const MainCampers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = (profile) => (
    <div className="profile-content-wrapper">
      <motion.div
        className="camper-img-frame"
        initial={{ rotate: 15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -10, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <VideoPlayer videoUrl={"https://www.youtube.com/embed/OKMsheDmK8Q"} title="Historia Camper" />
      </motion.div>
      <motion.div
        className="profile-card-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <h2>{profile.name}</h2>
        <div className='merits-container'>
          {profile.merits.slice(0, 4).map((skill, index) => (
            <div className="merit-item" key={index}>
              {skill.name}
            </div>
          ))}
        </div>
        <p>{profile.description}</p>
        <div className="profile-card-signature">
          <p>{profile.name}</p>
        </div>
        <button className="profile-card-button">Mas Informacion</button>
      </motion.div>
    </div>
  );
  

  const renderPagination = () => (
    <div className="custom-pagination">
      {profiles.map((_, index) => (
        <button
          key={index}
          className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );

  return (
    <div className="developer-profiles">
      <div className="profile-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {renderContent(profiles[currentIndex])}
          </motion.div>
        </AnimatePresence>
        {renderPagination()}
      </div>
    </div>
  );
};

export default MainCampers;