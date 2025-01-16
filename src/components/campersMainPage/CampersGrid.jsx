import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchCampersFormacion, fetchMeritsCamperById, fetchAllMerits } from "../../services/camperService";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./styles/CampersGrid.css";
import { useNavigate } from "react-router-dom";

const defaultProfileImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

const CampersGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [campersPerPage, setCampersPerPage] = useState(8);
    const [expandedSkills, setExpandedSkills] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [predefinedSkills, setPredefinedSkills] = useState([]);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [campersData, setCampersData] = useState([]);
    const [filteredCampers, setFilteredCampers] = useState([]);
    const navigate = useNavigate();

    const mobileVisibleSkillsCount = 4;
    const desktopVisibleSkillsCount = predefinedSkills.length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campers = await fetchCampersFormacion();
                const allMerits = await fetchAllMerits();

                const campersWithMeritsPromises = campers.map(async (camper) => {
                    const skills = await fetchMeritsCamperById(camper.camper_id);
                    return {
                        ...camper,
                        skills,
                    };
                });

                const campersWithMerits = await Promise.all(campersWithMeritsPromises);

                setPredefinedSkills(allMerits);
                setCampersData(campersWithMerits);
                setFilteredCampers(campersWithMerits); // Inicialmente mostramos todos los campers
                setIsLoading(false);
            } catch (err) {
                setError("Error al cargar los datos de los campers.");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const handleSkillFilter = (skill) => {
        setSelectedSkills((prev) =>
            prev.some(s => s.id === skill.id)
                ? prev.filter((s) => s.id !== skill.id)
                : [...prev, skill]
        );
        setCurrentPage(1);
    };

    // Filtrado de campers por el nombre a medida que se escribe
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCampers(campersData); // Si no hay búsqueda, mostramos todos los campers
            return;
        }

        const filtered = campersData.filter((camper) =>
            camper.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCampers(filtered); // Actualizamos los campers filtrados
    }, [searchTerm, campersData]);

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            // Puedes hacer que realice alguna acción adicional cuando presionan Enter
            console.log("Búsqueda enviada:", searchTerm);
        }
    };

    // Filtrado de campers por habilidades seleccionadas
    const filteredCampersBySkills = selectedSkills.length === 0
        ? filteredCampers
        : filteredCampers.filter((camper) =>
            selectedSkills.every((skill) =>
                camper.skills.some((camperSkill) => camperSkill.id === skill.id)
            )
        );

    const startIndex = (currentPage - 1) * campersPerPage;
    const currentCampers = filteredCampersBySkills.slice(startIndex, startIndex + campersPerPage);

    return (
        <section className="campersgrid">
            <div className="badge-filters">
                <h3>Busca a Tu Camper</h3>
                <div className="skill-filters wrapper-filter">
                    <div className={`filter-buttons ${isFilterExpanded ? "expanded" : ""}`}>
                        <AnimatePresence className="AnimatePresence">
                            {visibleSkills.map((skill) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <Button
                                        className={`skill-button icon-filter badgeInfo ${selectedSkills.some(selectedSkill => selectedSkill.id === skill.id) ? "selected" : "outline"}`}
                                        onClick={() => handleSkillFilter(skill)}
                                    >
                                        <div className="tooltip-filter">{skill.description}</div>
                                        {skill.name + " "} {skill.icon}
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                    </div>

                    {/* Campo de búsqueda */}
                    <div className="search-container">
                            <input
                                type="text"
                                placeholder="Buscar por nombre 🔍"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearchSubmit}
                                className="search-input"
                            />
                        </div>
                    </div>
                    
                    {isMobile && predefinedSkills.length > mobileVisibleSkillsCount && (
                        <button
                            className={`expand-filters-button ${isFilterExpanded ? "expanded" : ""
                                }`}
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                        >
                            {isFilterExpanded ? "Ver menos" : "Ver más"}
                            <ChevronDown
                                className={`ml-2 h-4 w-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    )}
                    
                    
                </div>
                

            <AnimatePresence mode="wait">
                <motion.div key={currentPage} className="grid-container">
                    {currentCampers.map((camper) => (
                        <div key={camper.camper_id} className="developer-card">
                            <div className="dev-card-content">
                                <div className="camper-image">
                                    <LazyLoadImage
                                        src={camper.profile_picture || defaultProfileImage}
                                        alt={camper.full_name}
                                        effect="blur"
                                        className="w-full h-[300px] object-cover rounded-lg"
                                    />
                                </div>
                                <div className="camper-maininfo">
                                    <h3>{camper.full_name}</h3>
                                    <p>{camper.title}</p>
                                    <div className="technologies">
                                        <span className="tech-label">Méritos:</span>
                                        <div layout className="skills-wrapper wrapper">
                                            <div className={`skills-container ${expandedSkills[camper.camper_id] ? "expanded" : ""}`}>
                                                <AnimatePresence>
                                                    {camper.skills.map((skill, index) => (
                                                        <motion.div
                                                            key={skill.id}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="skill-item-mp"
                                                        >
                                                            {skill.name + " "}{skill.icon}
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
                                                            [camper.camper_id]: !prev[camper.camper_id],
                                                        }))
                                                    }
                                                >
                                                    {expandedSkills[camper.camper_id] ? "Ver menos" : "Ver más"}
                                                    <ChevronDown
                                                        className={`ml-2 h-4 w-4 transition-transform ${expandedSkills[camper.camper_id] ? "rotate-180" : ""}`}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button
                                            className="info-button"
                                            onClick={() => navigate(`/campers/profile/${camper.camper_id}`)}
                                        >
                                            Más Info
                                        </button>
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
                total={filteredCampersBySkills.length}
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
                        ${dot === "..."
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
