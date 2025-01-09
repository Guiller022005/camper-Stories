import React, { useState } from 'react';
import styles from './styles/VideoPlayerEdit.module.css'

const VideoPlayerEdit = ({ videoUrl, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.videoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(true)}
    >
      <iframe
        src={`${videoUrl}${isHovered ? '?autoplay=1&mute=1' : ''}`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={styles.videoIframe}
      />
    </div>
  );
};

export default VideoPlayerEdit;
