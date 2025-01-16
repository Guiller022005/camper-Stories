// VideoPlayer.jsx
import React, { useState } from 'react';
import styles from './styles/VideoPlayer.module.css'; // Cambia a .module.css

const VideoPlayer = ({ videoUrl, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getEmbedUrl = (url) => {
    try {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId[1]}`;
      }
      
      return url;
    } catch (error) {
      console.error('Error al procesar la URL del video:', error);
      return url;
    }
  };

  return (
    <div
      className={styles.videoContainer} // Usa el nombre de clase del módulo CSS
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <iframe
        src={`${getEmbedUrl(videoUrl)}${isHovered ? '?autoplay=1&mute=1' : ''}`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={styles.videoIframe} // Usa el nombre de clase del módulo CSS
      />
    </div>
  );
};

export default VideoPlayer;