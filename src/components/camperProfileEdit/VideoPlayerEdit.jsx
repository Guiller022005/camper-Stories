import React, { useState } from 'react';
import styles from './styles/VideoPlayerEdit.module.css'

const VideoPlayerEdit = ({ videoUrl, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getEmbedUrl = (url) => {
    try {
      // Extraer el ID del video de diferentes formatos de URL de YouTube
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
      
      // Si encontramos un ID válido, retornamos la URL de embed
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId[1]}`;
      }
      
      // Si no se pudo extraer el ID, retornamos la URL original
      return url;
    } catch (error) {
      console.error('Error al procesar la URL del video:', error);
      return url;
    }
  };

  return (
    <div
      className={styles.videoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} // Corregido de true a false
    >
      <iframe
        src={`${getEmbedUrl(videoUrl)}${isHovered ? '?autoplay=1&mute=1' : ''}`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={styles.videoIframe}
      />
    </div>
  );
};

export default VideoPlayerEdit;