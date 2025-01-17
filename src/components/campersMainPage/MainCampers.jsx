import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "swiper/css";
import "swiper/css/pagination";
import "./styles/MainCampers.css";
import VideoPlayer from "../../components/camperProfile/VIdeoPlayer"; // Arreglo ruta
import { fetchCampersEgresados, fetchMeritsCamperById } from "../../services/camperService";

const MainCampers = () => {
  const [campers, setCampers] = useState([]); // Estado para los campers
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del camper actual
  const [currentMerits, setCurrentMerits] = useState([]); // Méritos del camper actual
  const [loadingMerits, setLoadingMerits] = useState(false); // Indicador de carga para los méritos
  const navigate = useNavigate(); // Obtén la función navigate

  // Cargar los datos de los campers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const campersData = await fetchCampersEgresados();
        setCampers(campersData.slice(0, 5)); // Limitar a los primeros 5 campers
      } catch (error) {
        console.error("Error fetching campers:", error);
      }
    };
    fetchData();
  }, []);

  // Cargar los méritos del camper actual cuando cambie `currentIndex`
  useEffect(() => {
    const fetchMerits = async () => {
      if (campers.length > 0) {
        const currentCamper = campers[currentIndex];
        const camperId = currentCamper.camper_id;

        if (!camperId) {
          console.warn("Camper actual sin ID:", currentCamper);
          setCurrentMerits([]);
          return;
        }

        setLoadingMerits(true);
        try {
          const merits = await fetchMeritsCamperById(camperId);
          setCurrentMerits(merits);
        } catch (error) {
          console.error(`Error fetching merits for camper ${camperId}:`, error);
          setCurrentMerits([]);
        } finally {
          setLoadingMerits(false);
        }
      }
    };
    fetchMerits();
  }, [currentIndex, campers]);

  // Renderizar el contenido del camper actual
  const renderContent = (profile) => (
    <div className="profile-content-wrapper">
      <motion.div
        className="camper-img-frame"
        initial={{ rotate: 15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -10, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <VideoPlayer
          videoUrl={profile.main_video_url || "https://www.youtube.com/embed/OKMsheDmK8Q"}
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
        <h2>{profile.full_name || "Sin nombre"}</h2>
        <div className="merits-container wrapper">
        {loadingMerits ? (
          <p>Cargando méritos...</p>
        ) : currentMerits.length > 0 ? (
          currentMerits.slice(0, 4).map((merit, index) => (
            <div className="merit-item icon badgeInfo" key={index}>
              <div className="tooltip">{merit.description}</div>
              {/* Mostrar el nombre del mérito */}
              <span className="merit-name">{merit.name}</span>
              {/* Mostrar el icono si está disponible */}
              {merit.icon ? (
                <span className="merit-icon">{merit.icon}</span>
              ) : (
                <span className="default-icon">🏅</span>
              )}
            </div>
          ))
        ) : (
          <p>No hay méritos disponibles.</p>
        )}
      </div>

        <p>{profile.about || "Sin descripción"}</p>
        <div className="profile-card-signature">
          <p>{profile.full_name || "Sin nombre"}</p>
        </div>
        <button 
          className="profile-card-button" 
          onClick={() => navigate(`/campers/profile/${profile.camper_id}`)}
        >
          Más Información
        </button>
      </motion.div>
    </div>
  );

  // Renderizar la paginación
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

  return (
    <div className="developer-profiles">
      <div className="profile-card">
        <AnimatePresence mode="wait">
          {campers.length > 0 && currentIndex < campers.length ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {renderContent(campers[currentIndex])}
            </motion.div>
          ) : (
            <div>No hay información disponible.</div>
          )}
        </AnimatePresence>
        {renderPagination()}
      </div>
    </div>
  );
};

export default MainCampers;