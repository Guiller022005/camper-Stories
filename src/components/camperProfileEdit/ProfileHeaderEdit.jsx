import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Mail, MapPin, Cake, Trophy, ChevronDown } from 'lucide-react';
import ProfileHeaderModal from '../camperProfileEdit/modals/ProfileHeaderModal';
import MeritsModal from '../camperProfileEdit/modals/MeritsModal';
import styles from './styles/ProfileHeaderEdit.module.css'

const ProfileHeaderEdit = ({ skills, name, ciudadOrigen, edad, mainImage, initialMerits }) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const maxVisibleBadges = 6;

  const handleToggleBadges = () => {
    setShowAllBadges((prev) => !prev);
  };

  return (
    <motion.div
      className={styles.profileHeader}
      initial={false}
      animate={{ height: 'auto' }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      layout
    >
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <img src={mainImage} className={styles.profileImageContent} alt="Profile" />
          </div>
          <div className={styles.profileDetails}>
            <h1 className={styles.profileName}>
              {name}
              <ProfileHeaderModal 
                initialData={{ 
                  nombre: name, 
                  city: ciudadOrigen, 
                  age: edad, 
                  mainImage: mainImage
                }}
              />
            </h1>
            <div className={styles.camperDetails}>
              <div className={styles.profileCity}>
                <MapPin /><p>{ciudadOrigen}</p>
              </div>
              <div className={styles.profileAge}>
                <Cake /><p>{edad} Años</p>
              </div>
            </div>
            <div className={styles.profileButtons}>
              <button className={styles.profileButton}>
                <Mail className={styles.profileIcon} />
                Contactar
              </button>
              <button className={styles.profileButton}>
                <Share2 className={styles.profileIcon} />
                Compartir
              </button>
            </div>
          </div>
        </div>
        <motion.div
          className={styles.profileBadgesBox}
          layout
          initial={false}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={styles.badgesTitle}>
            <Trophy />
            <p>Méritos</p>
            <MeritsModal initialMerits={initialMerits}/>
          </div>
          <div className="badges-container wrapper">
            {skills &&
              skills
                .slice(0, showAllBadges ? skills.length : maxVisibleBadges)
                .map((skill, index) => (
                  <div key={index} className="skill-item icon badgeInfo">
                    <div className="tooltip">{skill.description}</div>
                    {skill.name}
                  </div>
                ))}
          </div>
          {skills && skills.length > maxVisibleBadges && (
            <div className={styles.toggleBadgesButton} onClick={handleToggleBadges}>
              <span className={styles.toggleBadgesContent}>
                {showAllBadges ? 'Ver menos' : 'Ver más'}
                <ChevronDown
                  className={`${styles.chevronIcon} ${showAllBadges ? styles.rotate180 : ''}`}
                />
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeaderEdit;