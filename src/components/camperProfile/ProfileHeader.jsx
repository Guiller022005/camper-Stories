// ProfileHeader.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Mail, MapPin, Cake, Trophy, ChevronDown } from "lucide-react";
import "./styles/ProfileHeader.css";
import { ProfileImage } from "./ProfileImage"; // Importa el componente ProfileImage
import ProfileHeaderModal from "../camperProfileEdit/modals/ProfileHeaderModal";
import MeritsModal from "../camperProfileEdit/modals/MeritsModal";
import { LazyLoadImage } from "react-lazy-load-image-component";


const ProfileHeader = ({ data, initialMerits, onUpdate }) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const maxVisibleBadges = 6;

  const handleToggleBadges = () => {
    setShowAllBadges((prev) => !prev);
  };

  return (
    <motion.div
      className="profile-header"
      initial={false}
      animate={{ height: "auto" }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      layout
    >
      <div className="profile-container">
        <div className="profile-content">
          {/* Envolvemos ProfileImage con .icon y .badgeInfo para el tooltip */}
          <div className="icon badgeInfo profile-image">
            {/* Usa el componente ProfileImage */}
            <ProfileImage
              imageUrl={
                data.profile_picture && data.profile_picture.trim() !== ""
                  ? data.profile_picture
                  : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              progress={75} // Aquí puedes pasar el progreso dinámico
            />
            {/* Tooltip Motivacional */}
            <div className="custom-tooltip">
              🌟 ¡Gran trabajo! Casi llegas a los 10M de patrocinio camper. 🏆 ¡No te detengas ahora! 🚀
            </div>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              <p>{data.full_name}</p>
            </h1>
            <div className="camper-details">
              <div className="profile-city">
                <MapPin />
                <p>{data.city}</p>
              </div>
              <div className="profile-age">
                <Cake />
                <p>{`${data.age} Años`}</p>
              </div>
            </div>
            <div className="profile-buttons">
              <button className="profile-button">
                <Mail className="profile-icon" />
                Contactar
              </button>
              <button className="profile-button">
                <Share2 className="profile-icon" />
                Compartir
              </button>
            </div>
          </div>
        </div>
        <motion.div
          className="profile-badges-box"
          layout
          initial={false}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="badges-title">
            <Trophy />
            <p>Méritos</p>
          </div>
          <div className="badges-container wrapper">
            {initialMerits
              .slice(0, showAllBadges ? initialMerits.length : maxVisibleBadges)
              .map((merit, index) => (
                <div key={index} className="skill-item icon badgeInfo">
                  <div className="tooltip">{merit.description}</div>
                  {merit.name} {merit.icon}
                </div>
              ))}
          </div>
          {initialMerits.length > maxVisibleBadges && (
            <div className="toggle-badges-button" onClick={handleToggleBadges}>
              <span className="toggle-badges-content">
                {showAllBadges ? "Ver menos" : "Ver más"}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${
                    showAllBadges ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;