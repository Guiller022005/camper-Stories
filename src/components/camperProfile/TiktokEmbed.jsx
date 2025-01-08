import { useEffect } from "react";
import "./styles/TiktokEmbed.css";
const TikTokEmbed = ({ videoUrl }) => {
  useEffect(() => {
    // Asegurarse de que el script de TikTok se cargue para inicializar los videos incrustados
    const scriptId = "tiktok-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
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