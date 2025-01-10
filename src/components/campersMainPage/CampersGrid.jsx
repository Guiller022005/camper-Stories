import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import campersData from "../../data/camperSucess";
import "./styles/CampersGrid.css";

const predefinedSkills = [
  {
    name: "Espíritu Guerrero ⚔️",
    description:
      "La persona que, además de programar, trabaja aparte del campus para superarse.",
  },
  {
    name: "Nuevos Horizontes 🌅",
    description:
      "Las personas que dejaron otra profesión para dedicarse a la programación.",
  },
  {
    name: "Trota Mundos 🌎",
    description: "Foráneos que se mudaron para estudiar programación.",
  },
  {
    name: "Primer Programador 💻",
    description:
      "Quien marca el inicio del camino en programación dentro de su familia.",
  },
  {
    name: "Gran Jefe 👑",
    description:
      "Líderes que destacan en equipos de desarrollo o proyectos de programación.",
  },
  {
    name: "Cabeza de Familia 👨‍👩‍👧‍👦",
    description:
      "Programadores que lideran y sostienen a sus familias mientras se capacitan o trabajan.",
  },
  {
    name: "Mujer de Impacto 💪",
    description:
      "Mujeres programadoras que generan un cambio significativo en su comunidad tecnológica.",
  },
  {
    name: "Emprendedor 💼",
    description:
      "Programadores que crean sus propios proyectos o startups tecnológicas.",
  },
  {
    name: "Despegue Digital 🚀",
    description:
      "Programadores que aprovechan al máximo las herramientas digitales para crecer.",
  },
  {
    name: "Rompe Esquemas 💥",
    description:
      "Reconocimiento a programadores que, estudiando en campus y no en una universidad formal, logran sobresalir.",
  },
];

const CampersGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campersPerPage, setCampersPerPage] = useState(8);
  const [expandedSkills, setExpandedSkills] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const mobileVisibleSkillsCount = 4;
  const desktopVisibleSkillsCount = predefinedSkills.length;

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

  const visibleSkills = isMobile
    ? isFilterExpanded
      ? predefinedSkills
      : predefinedSkills.slice(0, mobileVisibleSkillsCount)
    : predefinedSkills.slice(0, desktopVisibleSkillsCount);

  const filteredCampers =
    selectedSkills.length === 0
      ? campersData
      : campersData.filter((camper) =>
          selectedSkills.every((skill) =>
            camper.skills.some((camperSkill) => camperSkill.name === skill)
          )
        );

  const startIndex = (currentPage - 1) * campersPerPage;
  const currentCampers = filteredCampers.slice(
    startIndex,
    startIndex + campersPerPage
  );

  const handleSkillFilter = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setCurrentPage(1);
  };

  return (
    <section className="campersgrid">
      <div className="badge-filters">
        <h3>Busca a Tu Camper</h3>
        <div className="skill-filters wrapper-filter">
          <div
            className={`filter-buttons ${isFilterExpanded ? "expanded" : ""}`}
          >
            <AnimatePresence>
              {visibleSkills.map(({ name, description }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button
                    className={`skill-button icon-filter badgeInfo ${
                      selectedSkills.includes(name) ? "selected" : "outline"
                    }`}
                    onClick={() => handleSkillFilter(name)}
                  >
                    <div className="tooltip-filter">{description}</div>
                    {name}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {isMobile && predefinedSkills.length > mobileVisibleSkillsCount && (
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
            <div key={camper.id} className="developer-card">
              <div className="dev-card-content">
                <div className="camper-image">
                  <LazyLoadImage
                    src={camper.image}
                    alt={camper.name}
                    effect="blur"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>
                <div className="camper-maininfo">
                  <h3>{camper.name}</h3>
                  <p>{camper.role}</p>

                  <div className="technologies">
                    <span className="tech-label">Meritos:</span>
                    <div layout className="skills-wrapper wrapper">
                      <div
                        className={`skills-container ${
                          expandedSkills[camper.id] ? "expanded" : ""
                        }`}
                      >
                        <AnimatePresence>
                          {camper.skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: index * 0.1 }}
                              className="skill-item"
                            >
                              {skill.name}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {camper.skills.length > 4 && (
                        <button
                          variant="ghost"
                          size="sm"
                          className="expand-skills-button"
                          onClick={() =>
                            setExpandedSkills((prev) => ({
                              ...prev,
                              [camper.id]: !prev[camper.id],
                            }))
                          }
                        >
                          {expandedSkills[camper.id] ? "Ver menos" : "Ver más"}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${
                              expandedSkills[camper.id] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="info-button">Mas Info</button>
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
