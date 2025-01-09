import { useEffect, useState } from "react";
import styles from './styles/TiktokEmbedEdit.module.css';

const TikTokEmbedEdit = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scriptId = "tiktok-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.TikTok) {
          setIsLoading(false);
        }
      };
      document.body.appendChild(script);
    } else {
      // Si el script ya existe, intentamos recargar los widgets
      if (window.TikTok) {
        window.TikTok.reload();
        setIsLoading(false);
      }
    }
  }, [videoUrl]);
  
  return (
    <div className={styles.tiktokContainer}>
      <blockquote
        className={`tiktok-embed ${styles.tiktokEmbed}`}
        cite={videoUrl}
        data-video-id={videoUrl.split("/").pop()}
        data-autoplay="false"
        data-playsinline="false"
        data-autoplay-policy="user-initiated"
        data-muted="false"
        style={{ 
          maxWidth: "325px", 
          minWidth: "325px",
          background: 'transparent'
        }}
      >
        <section />
      </blockquote>
      {isLoading && (
        <div className={styles.preloader}>
          <div className={styles.preloaderSpinner}></div>
        </div>
      )}
    </div>
  );
};

export default TikTokEmbedEdit;