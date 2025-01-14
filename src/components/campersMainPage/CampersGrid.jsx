import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { fetchAllMerits, fetchCampersFormacion, fetchMeritsCamperById } from "../../services/camperService";
import "./styles/CampersGrid.css";

const CampersGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campersPerPage, setCampersPerPage] = useState(8);
  const [campersData, setCampersData] = useState([]);
  const [expandedCampers, setExpandedCampers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allMerits, campers] = await Promise.all([
          fetchAllMerits(),
          fetchCampersFormacion(),
        ]);

        const meritsPromises = campers.map(async (camper) => {
          const merits = await fetchMeritsCamperById(camper.camper_id);
          const randomMerit =
            merits.length > 0
              ? merits[Math.floor(Math.random() * merits.length)]
              : null;
          return {
            ...camper,
            merits,
            randomMerit, // Guardar el mérito aleatorio
          };
        });

        const updatedCampers = await Promise.all(meritsPromises);
        setCampersData(updatedCampers);
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

  const totalPages = Math.ceil(campersData.length / campersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * campersPerPage;
  const currentCampers = campersData.slice(
    startIndex,
    startIndex + campersPerPage
  );

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="campersgrid">
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} className="grid-container">
          {currentCampers.map((camper) => (
            <div key={camper.camper_id} className="developer-card">
              <div className="dev-card-content">
                <div className="camper-image">
                  <LazyLoadImage
                    src={camper.profile_picture}
                    alt={camper.full_name}
                    effect="blur"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>
                <div className="camper-maininfo">
                  <h3>{camper.full_name}</h3>
                  {/* Mérito Aleatorio */}
                  {camper.randomMerit && (
                    <div>
                      <span className="merit-icon">{camper.randomMerit.icon}</span>
                      {camper.randomMerit.name}
                      <span className="merit-icon">{camper.randomMerit.icon}</span>
                    </div>
                  )}
                  <div className="technologies">
                    <span className="tech-label">Méritos:</span>
                    <div className={`skills-wrapper wrapper`}>
                      <div
                        className={`skills-container ${
                          expandedCampers[camper.camper_id] ? "expanded" : ""
                        }`}
                      >
                        <AnimatePresence>
                        {camper.merits && camper.merits.length > 0 ? (
                        expandedCampers[camper.camper_id] ? (
                          camper.merits.map((merit, index) => (
                            <motion.div
                              key={merit.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`merit-item ${
                                camper.merits.length === 1 ? "merit-highlight" : ""
                              }`}
                            >
                              <span className="merit-icon">{merit.icon}</span>
                              {merit.name}
                            </motion.div>
                          ))
                        ) : (
                          <motion.div
                            key={camper.merits[0].name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`merit-item ${
                              camper.merits.length === 1 ? "merit-highlight" : ""
                            }`}
                          >
                            <span className="merit-icon">{camper.merits[0].icon}</span>
                            {camper.merits[0].name}
                          </motion.div>
                        )
                      ) : (
                        <div className="merit-item">Sin méritos disponibles</div>
                      )}

                        </AnimatePresence>
                      </div>
                      {camper.merits && camper.merits.length > 1 && (
                        <button
                          variant="ghost"
                          size="sm"
                          className="expand-skills-button"
                          onClick={() =>
                            toggleExpand(camper.camper_id)
                          }
                        >
                          {expandedCampers[camper.camper_id] ? "Ver menos" : "Ver más"}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${
                              expandedCampers[camper.camper_id] ? "rotate-180" : ""
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

      {/* Dot Pagination */}
      <DotPagination
        current={currentPage}
        pageSize={campersPerPage}
        total={campersData.length}
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
