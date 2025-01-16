import { useEffect } from "react";
import "../camperProfile/styles/TiktokEmbed.css";

const ErrorCard = ({ message }) => (
  <div className="w-full p-4 bg-blue-950/50 border border-blue-500/30 rounded-xl shadow-lg">
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="text-blue-500 text-4xl">
        <box-icon
          name="error-circle"
          type="solid"
          color="currentColor"
        ></box-icon>
      </div>
      <h3 className="text-lg font-semibold text-blue-200">Error de TikTok</h3>
      <p className="text-blue-300">{message}</p>
    </div>
  </div>
);

const TikTokEmbedEdit = ({ videoUrl }) => {
  // Validar que videoUrl exista y sea string
  if (!videoUrl || typeof videoUrl !== "string") {
    return <ErrorCard message="Este TikTok no tiene una URL válida" />;
  }

  // Función para extraer el ID del video de la URL de TikTok
  const getVideoId = (url) => {
    try {
      // Manejar diferentes formatos de URL de TikTok
      if (url.includes("/video/")) {
        // Para URLs como: "https://www.tiktok.com/@username/video/1234567890"
        const match = url.match(/\/video\/(\d+)/);
        const id = match ? match[1] : null;
        console.log("ID extraído de URL directa:", id);
        return id;
      } else if (url.includes("embed")) {
        // Para URLs de embed: "https://www.tiktok.com/embed/1234567890"
        const id = url.split("/").pop();
        console.log("ID extraído de URL embed:", id);
        return id;
      }
      console.log("No se pudo extraer ID, formato no reconocido");
      return null;
    } catch (error) {
      console.error("Error parsing TikTok URL:", error);
      return null;
    }
  };

  const videoId = getVideoId(videoUrl);
  if (!videoId) {
    return <ErrorCard message="Formato de URL de TikTok no válido" />;
  }

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
    <div className="tiktok-embed-container">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          <a target="_blank" href={videoUrl} rel="noopener noreferrer">
            {/* El reproductor se insertará aquí automáticamente */}
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbedEdit;
