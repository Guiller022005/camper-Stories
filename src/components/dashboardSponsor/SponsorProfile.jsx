import React, { useState } from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Share2, Mail, MapPin, Cake, Trophy, ChevronDown } from "lucide-react";

const ProfileHeader = ({ data, initialMerits }) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const maxVisibleBadges = 6;

  const handleToggleBadges = () => {
    setShowAllBadges((prev) => !prev);
  };

  return (
    <motion.div
      className="py-32 pb-10 bg-[#07072b] rounded-2xl overflow-hidden"
      initial={false}
      animate={{ height: "auto" }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      layout
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:pr-8 h-full">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/30 ring-2 ring-blue-500/20">
              <div className="w-full h-full rounded-full overflow-hidden">
                <LazyLoadImage
                  src={data.profile_picture?.trim() || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
                  alt={`Perfil de ${data.full_name}`}
                  effect="blur"
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center md:text-left">
              {data.full_name}
            </h1>
            
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3 text-gray-200">
                <MapPin className="w-5 h-5" />
                <p>{data.city}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-200">
                <Cake className="w-5 h-5" />
                <p>{`${data.age} Años`}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5">
                <Mail className="w-5 h-5 opacity-90" />
                Contactar
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5">
                <Share2 className="w-5 h-5 opacity-90" />
                Compartir
              </button>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <motion.div
          className="mt-8 md:mt-0 w-full md:max-w-lg bg-gray-800/60 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6"
          layout
          initial={false}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3 text-white mb-2">
            <Trophy className="w-5 h-5" />
            <p className="text-lg font-semibold">Méritos</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {initialMerits
              .slice(0, showAllBadges ? initialMerits.length : maxVisibleBadges)
              .map((merit, index) => (
                <div 
                  key={index}
                  className="group relative flex items-center bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl px-4 py-2 text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>{merit.name}</span>
                  {merit.icon}
                  
                  {/* Tooltip */}
                  <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg transition-all duration-300 w-48 text-center z-50">
                    {merit.description}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
                  </div>
                </div>
              ))}
          </div>

          {initialMerits.length > maxVisibleBadges && (
            <button
              onClick={handleToggleBadges}
              className="flex items-center justify-center gap-2 text-white mt-4 mx-auto hover:underline"
            >
              {showAllBadges ? "Ver menos" : "Ver más"}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAllBadges ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;