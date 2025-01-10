// ProfileHeaderEdit.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Mail, MapPin, Cake, Trophy, ChevronDown } from 'lucide-react';
import ProfileHeaderModal from '../camperProfileEdit/modals/ProfileHeaderModal';
import MeritsModal from '../camperProfileEdit/modals/MeritsModal';
import styles from './styles/ProfileHeaderEdit.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProfileHeaderEdit = ({ data, initialMerits }) => {
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
            <LazyLoadImage
              src={data.profile_picture}
              alt={`Perfil de ${data.full_name}`}
              effect="blur"
              className="profile-image-content"
            />
          </div>
          <div className={styles.profileDetails}>
            <h1 className={styles.profileName}>
              <p>{data.full_name}</p>
              <ProfileHeaderModal
                initialData={{
                  nombre: data.full_name,
                  city: data.city,
                  age: data.age,
                  mainImage: data.profile_picture
                }}
              />
            </h1>
            <div className={styles.camperDetails}>
              <div className={styles.profileCity}>
                <MapPin />
                <p>{data.city}</p>
              </div>
              <div className={styles.profileAge}>
                <Cake />
                <p>{`${data.age} Años`}</p>
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
            <MeritsModal initialMerits={initialMerits} />
          </div>
          <div className={styles.badgesContainer}>
            {data.merits.slice(0, showAllBadges ? data.merits.length : maxVisibleBadges).map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                {skill.name}
              </div>
            ))}
          </div>
          {data.merits.length > maxVisibleBadges && (
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