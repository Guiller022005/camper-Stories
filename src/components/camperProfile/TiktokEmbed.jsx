import { useEffect } from "react";
import "./styles/TiktokEmbed.css";

const TikTokEmbed = ({ videoUrl }) => {
  useEffect(() => {
    const scriptId = "tiktok-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Pausar el video después de que se haya cargado
    const pauseVideo = () => {
      const iframe = document.querySelector('iframe[src*="tiktok.com"]');
      if (iframe) {
        const iframeContent = iframe.contentWindow;
        if (iframeContent) {
          // Enviar comando de pausa al iframe
          iframeContent.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo" }),
            "*"
          );
        }
      }
    };

    // Esperar a que el video cargue completamente
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector('iframe[src*="tiktok.com"]');
      if (iframe) {
        pauseVideo();
        observer.disconnect(); // Detener la observación
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Limpiar el observador al desmontar
    };
  }, []);

  return (
    <div>
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={videoUrl.split("/").pop()}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          {/* Este bloque será reemplazado automáticamente por el reproductor embebido */}
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;
  