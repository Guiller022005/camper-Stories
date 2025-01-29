import React from "react";

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
      console.error("Error processing video URL:", error);
      return url;
    }
  };

  return (
    <div className="relative w-full pt-[56.25%] overflow-hidden rounded-lg">
      {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
        <iframe
          src={`${getEmbedUrl(videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getEmbedUrl(videoUrl).split("/").pop()}`}
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      ) : (
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          title={title}
        />
      )}
    </div>
  );
};

export default VideoPlayer;