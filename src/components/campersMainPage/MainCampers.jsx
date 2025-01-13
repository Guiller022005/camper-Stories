import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/MainCampers.css";
import VideoPlayer from "../../components/camperProfile/VIdeoPlayer";
import { fetchCampers } from "../../services/camperService"; // Asegúrate de importar la función correctamente

const MainCampers = () => {
  const [campers, setCampers] = useState([]); // Estado para almacenar los campers
  const [currentIndex, setCurrentIndex] = useState(0);

  // Usar useEffect para cargar los datos de los campers desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCampers(); // Llamada a la API para obtener los campers
        const limitedData = data.slice(0, 5); // Limita los resultados a los primeros 5 campers
        setCampers(limitedData); // Actualiza el estado con los datos
      } catch (error) {
        console.error("Error fetching campers:", error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  const renderContent = (profile) => {
    const defaultVideoUrl = "https://www.youtube.com/embed/OKMsheDmK8Q"; // Video predeterminado

    return (
      <div className="profile-content-wrapper">
        <motion.div
          className="camper-img-frame"
          initial={{ rotate: 15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -10, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <VideoPlayer
            videoUrl={profile.main_video_url || defaultVideoUrl} // Usa la URL del video o el predeterminado
            title="Historia Camper"
          />
        </motion.div>
        <motion.div
          className="profile-card-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h2>{profile.full_name}</h2> {/* Usa el nombre del camper */}
          {/* Los méritos están deshabilitados por ahora */}
          <div className="merits-container wrapper">
            {Array.isArray(profile.merits) && profile.merits.length > 0
              ? profile.merits.slice(0, 4).map((skill, index) => (
                  <div className="merit-item icon badgeInfo" key={index}>
                    <div className="tooltip">{skill.description}</div>
                    {skill.name}
                  </div>
                ))
              : "No hay méritos disponibles."}
          </div>
          <p>{profile.about}</p> {/* Usa la descripción del camper */}
          <div className="profile-card-signature">
            <p>{profile.full_name}</p>
          </div>
          <button className="profile-card-button">Más Información</button>
        </motion.div>
      </div>
    );
  };

  const renderPagination = () => (
    <div className="custom-pagination">
      {campers.map((_, index) => (
        <button
          key={index}
          className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );

  // Si los campers aún no se han cargado, muestra un mensaje de carga
  if (campers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="developer-profiles">
      <div className="profile-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {renderContent(campers[currentIndex])}
          </motion.div>
        </AnimatePresence>
        {renderPagination()}
      </div>
    </div>
  );
};

export default MainCampers;
