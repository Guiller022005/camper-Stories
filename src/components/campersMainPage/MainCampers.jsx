import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/camperProfile/VIdeoPlayer";
import { fetchCampersFormacion, fetchMeritsCamperById } from "../../services/camperService";
import { GraduationCap, Code, Rocket, Trophy } from 'lucide-react';

const MainCampers = () => {
  const [campers, setCampers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMerits, setCurrentMerits] = useState([]);
  const [loadingMerits, setLoadingMerits] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campersData = await fetchCampersFormacion();
        // Ordena aleatoriamente los campers
        const shuffledCampers = campersData.sort(() => Math.random() - 0.5);
        // Muestra sólo un subconjunto si es necesario
        setCampers(shuffledCampers.slice(0, 5));
      } catch (error) {
        console.error("Error fetching campers:", error);
      }
    };
    fetchData();
  }, []);

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

  // Efecto para cambiar automáticamente el camper cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % campers.length);
    }, 6000); // 6000 milisegundos = 6 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [campers.length]);

  const badges = [
    { text: "Nuevos horizontes", icon: <Rocket className="w-4 h-4 md:w-5 md:h-5" /> },
    { text: "Primer programador", icon: <Code className="w-4 h-4 md:w-5 md:h-5" /> },
    { text: "Gran jefe", icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" /> },
    { text: "Emprendedor", icon: <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className="bg-[#131341] relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh] py-8 px-4">
      {/* Animated Background Gradient */}
      <motion.div className="absolute inset-0 opacity-30" />

      {/* Large Decorative Circles - adjusted for responsive */}
      <div className="absolute top-1/4 -left-32 md:-left-64 w-64 md:w-128 h-64 md:h-128 bg-[#6366F1]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 md:-right-64 w-64 md:w-128 h-64 md:h-128 bg-[#66E7F3]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {campers.length > 0 && currentIndex < campers.length ? (
            <motion.div
              key={campers[currentIndex].camper_id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Información Column */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 md:space-y-7 order-2 lg:order-1"
              >
                <div className="space-y-4 md:space-y-6">
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="bg-gradient-to-r from-[#66E7F3] via-blue-400 to-[#6366F1] text-transparent bg-clip-text">
                      {campers[currentIndex].full_name}
                    </span>
                  </motion.h1>

                  <motion.div
                    className="flex flex-wrap gap-2 md:gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    {badges.map(({ text, icon }) => (
                      <div
                        key={text}
                        className="bg-white/10 hover:bg-white/20 text-color2 px-3 md:px-5 py-2 md:py-3 text-sm md:text-base flex items-center gap-2 md:gap-3 backdrop-blur-sm transition-all hover:scale-105 rounded-full"
                      >
                        {icon}
                        <span className="hidden sm:inline text-white">{text}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.p
                  className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {campers[currentIndex].about}
                </motion.p>

                <motion.div
                  className="font-firma text-[#66E7F3] text-3xl md:text-5xl lg:text-6xl italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {campers[currentIndex].full_name}
                </motion.div>

                <motion.button
                  onClick={() => navigate(`/campers/profile/${campers[currentIndex].camper_id}`)}
                  className="w-full sm:w-auto bg-[#6366F1] hover:bg-[#6366F1]/90 text-white px-4 md:px-5 py-3 md:py-4 text-lg md:text-xl mt-6 md:mt-10 rounded-xl md:rounded-2xl
                            relative group overflow-hidden transition-all hover:shadow-lg hover:shadow-[#6366F1]/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="relative z-10">Más Información</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#66E7F3] to-[#6366F1] opacity-0 
                                group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </motion.div>

              {/* Video Column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#66E7F3]/20 to-purple-500/20 rounded-2xl md:rounded-3xl" />
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VideoPlayer
                      videoUrl={campers[currentIndex].main_video_url || "https://www.youtube.com/embed/OKMsheDmK8Q"}
                      title="Historia Camper"
                      className="w-full rounded-2xl md:rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18174f94] via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Decorative elements - adjusted sizes for mobile */}
                <div className="absolute -top-5 md:-top-10 -left-5 md:-left-10 w-12 md:w-20 h-12 md:h-20 bg-[#66E7F3]/30 rounded-full blur-xl" />
                <div className="absolute -bottom-3 md:-bottom-5 -right-3 md:-right-5 w-10 md:w-16 h-10 md:h-16 bg-[#6366F1]/30 rounded-full blur-xl" />
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-white text-center">No hay información disponible.</div>
          )}
        </AnimatePresence>

        {/* Interactive Navigation Dots */}
        <motion.div
          className="flex justify-center gap-2 md:gap-4 mt-12 md:mt-24"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {campers.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === currentIndex
                ? "bg-color2 w-12 md:w-16 h-3 md:h-4" // Bala activa
                : "bg-swiper-bullet-bg hover:bg-swiper-bullet-hover-bg w-3 md:w-4 h-3 md:h-4" // Balas normales
                }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default MainCampers;
