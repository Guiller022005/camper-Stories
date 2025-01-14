import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchAllMerits, fetchCampersFormacion, fetchMeritsCamperById } from "../../services/camperService"; // APIs
import "./styles/CampersGrid.css";

const defaultProfileImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

const CampersGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campersPerPage, setCampersPerPage] = useState(8);
  const [expandedCampers, setExpandedCampers] = useState({});
  const [selectedMerits, setSelectedMerits] = useState([]); // Méritos seleccionados (array)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [allMerits, setAllMerits] = useState([]); // Para almacenar los méritos
  const [campersData, setCampersData] = useState([]); // Datos de los campers
  const [filteredCampers, setFilteredCampers] = useState([]); // Estado para almacenar los campers filtrados
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Definir el número de méritos visibles según el dispositivo (móvil o desktop)
  const mobileVisibleSkillsCount = 4;
  const desktopVisibleSkillsCount = 2;  // Ajuste el número de méritos visibles para escritorio

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCampersPerPage(mobile ? 4 : 8);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allMeritsData, campers] = await Promise.all([
          fetchAllMerits(),
          fetchCampersFormacion(),
        ]);

        setAllMerits(allMeritsData);

        const meritsPromises = campers.map(async (camper) => {
          const merits = await fetchMeritsCamperById(camper.camper_id);
          return {
            ...camper,
            merits,
          };
        });

        const updatedCampers = await Promise.all(meritsPromises);
        setCampersData(updatedCampers);
        setFilteredCampers(updatedCampers); // Establecer los campers filtrados inicialmente
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (camperId) => {
    setExpandedCampers((prevState) => ({
      ...prevState,
      [camperId]: !prevState[camperId],
    }));
  };

  const handleFilterMerit = (meritId) => {
    setSelectedMerits((prevSelected) =>
      prevSelected.includes(meritId)
        ? prevSelected.filter((id) => id !== meritId) // Elimina el mérito si ya estaba seleccionado
        : [...prevSelected, meritId] // Agrega el mérito si no estaba seleccionado
    );
  };

  const totalPages = Math.ceil(filteredCampers.length / campersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * campersPerPage;
  const currentCampers = filteredCampers.slice(
    startIndex,
    startIndex + campersPerPage
  );

  // Filtrar los campers para que solo se muestren los que tienen al menos uno de los méritos seleccionados
  const filteredCampersResult = selectedMerits.length === 0
    ? campersData
    : campersData.filter((camper) =>
        selectedMerits.some((meritId) =>
          camper.merits.some((merit) => merit.id === meritId) // Verifica si el camper tiene al menos uno de los méritos seleccionados
        )
      );

  // Actualizar el estado de los campers filtrados
  useEffect(() => {
    setFilteredCampers(filteredCampersResult);
  }, [selectedMerits]);

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  // Función para manejar el error de imagen
  const handleImageError = (event) => {
    event.target.src = defaultProfileImage; // Establecer imagen por defecto si falla la carga
  };

  return (
    <section className="campersgrid">
      <div className="badge-filters">
        <h3>Busca a Tu Camper</h3>
        <div className="skill-filters wrapper-filter">
          <div className={`filter-buttons ${isFilterExpanded ? "expanded" : ""}`}>
            <AnimatePresence>
              {allMerits.map(({ id, name, description, icon }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div
                    className={`skill-button icon-filter badgeInfo ${
                      selectedMerits.includes(id) ? "selected" : "outline"
                    }`}
                    onClick={() => handleFilterMerit(id)} // Evento de clic para filtrar por mérito
                  >
                    <div className="tooltip-filter">{description}</div>
                    <span className="merit-icon">{icon}</span>
                    {name}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {isMobile && allMerits.length > mobileVisibleSkillsCount && (
            <button
              className={`expand-filters-button ${
                isFilterExpanded ? "expanded" : ""
              }`}
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              {isFilterExpanded ? "Ver menos" : "Ver más"}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  isFilterExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentPage} className="grid-container">
          {currentCampers.map((camper) => (
            <div key={camper.camper_id} className="developer-card">
              <div className="dev-card-content">
                <div className="camper-image">
                  <LazyLoadImage
                    src={camper.profile_picture || defaultProfileImage}  // Verificar si la imagen es nula
                    alt={camper.full_name}
                    effect="blur"
                    className="w-full h-[300px] object-cover rounded-lg"
                    onError={handleImageError}  // Manejar error de carga de imagen
                  />
                </div>
                <div className="camper-maininfo">
                  <h3>{camper.full_name}</h3>
                  <div className="technologies">
                    <span className="tech-label">Méritos:</span>
                    <div layout className="skills-wrapper wrapper">
                      <div
                        className={`skills-container ${
                          expandedCampers[camper.camper_id] ? "expanded" : ""
                        }`}
                      >
                        <AnimatePresence>
                          {camper.merits.map((merit, index) => (
                            <motion.div
                              key={merit.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: index * 0.1 }}
                              className="merit-item"
                            >
                              <span className="merit-icon">{merit.icon}</span>
                              {merit.name}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {camper.merits.length > 4 && (
                        <button
                          variant="ghost"
                          size="sm"
                          className="expand-skills-button"
                          onClick={() =>
                            toggleExpand(camper.camper_id)
                          }
                        >
                          {expandedCampers[camper.camper_id]
                            ? "Ver menos"
                            : "Ver más"}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${
                              expandedCampers[camper.camper_id]
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="info-button">Más Info</button>
                    <button className="sponsor-button">Patrocinar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <DotPagination
        current={currentPage}
        pageSize={campersPerPage}
        total={filteredCampers.length}
        onChange={setCurrentPage}
      />
    </section>
  );
};

// DotPagination Component
const DotPagination = ({ current, total, pageSize, onChange }) => {
  const pageCount = Math.ceil(total / pageSize);

  const getVisibleDots = () => {
    let dots = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        dots.push(i);
      }
      return dots;
    }

    if (current <= 4) {
      dots = [1, 2, 3, 4, 5, "...", pageCount];
    } else if (current >= pageCount - 3) {
      dots = [
        1,
        "...",
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ];
    } else {
      dots = [1, "...", current - 1, current, current + 1, "...", pageCount];
    }

    return dots;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {getVisibleDots().map((dot, index) => (
        <button
          key={index}
          onClick={() => dot !== "..." && onChange(dot)}
          disabled={dot === "..."}
          className={`
            w-3 h-3 rounded-full transition-all duration-200 ease-in-out
            ${
              dot === "..."
                ? "w-6 bg-gray-300 cursor-default"
                : dot === current
                ? "bg-blue-500 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }
          `}
          aria-label={dot === "..." ? "More pages" : `Page ${dot}`}
        >
          {dot === "..." && <span className="text-xs text-gray-600">•••</span>}
        </button>
      ))}
    </div>
  );
};

export default CampersGrid;
