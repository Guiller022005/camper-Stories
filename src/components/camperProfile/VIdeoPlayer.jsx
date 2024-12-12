import React, { useState } from 'react';
import './styles/VideoPlayer.css';

const VideoPlayer = ({ videoUrl, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="video-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <iframe
        src={`${videoUrl}${isHovered ? '?autoplay=1&mute=1' : ''}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="video-iframe"
      />
    </div>
  );
};

export default VideoPlayer;