// VideoPlayer.jsx
import React from "react";
import styles from "./styles/VideoPlayer.module.css";

const VideoPlayer = ({ videoUrl, title }) => {
  const getEmbedUrl = (url) => {
    try {
      const videoId = url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/
      );

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId[1]}`;
      }

      return url;
    } catch (error) {
      console.error("Error al procesar la URL del video:", error);
      return url;
    }
  };

  return (
    <div className={styles.videoContainer}>
      <iframe
        src={`${getEmbedUrl(videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getEmbedUrl(videoUrl).split('/').pop()}`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={styles.videoIframe}
      />
    </div>
  );
};

export default VideoPlayer;
