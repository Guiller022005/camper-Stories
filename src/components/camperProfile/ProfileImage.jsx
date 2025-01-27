// ProfileImage.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

export function ProfileImage({ imageUrl, progress = 75 }) {
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [showFlames, setShowFlames] = useState(false);
  const prevProgress = useRef(progress);

  useEffect(() => {
    const angle = (progress / 100) * 360; // Convertir progreso a ángulo
    const radian = (angle - 90) * (Math.PI / 180); // Convertir ángulo a radianes
    const radius = 120; // Radio del círculo de progreso (ajustado para que sea más visible)
    const x = Math.cos(radian) * radius; // Posición X del cohete
    const y = Math.sin(radian) * radius; // Posición Y del cohete

    // Mostrar animación de llamas cuando el progreso aumenta
    if (progress > prevProgress.current) {
      setShowFlames(true);
      const timer = setTimeout(() => setShowFlames(false), 1000);
      return () => clearTimeout(timer);
    }

    prevProgress.current = progress;
    setRocketPosition({ x, y });
  }, [progress]);

  return (
    <div className="relative w-64 h-64 group">
      {/* Círculo de progreso */}
      <svg className="absolute inset-0 w-full h-90 -rotate-90" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7b500" />
            <stop offset="100%" stopColor="#ff4d4d" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Círculo de progreso con gradiente y brillo */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(2 * Math.PI * 95 * progress) / 100} ${2 * Math.PI * 95}`}
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Imagen de perfil */}
      <div className="absolute inset-6">
    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2A2B3F] relative group-hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-overlay" />
        <img
        src={imageUrl || "/placeholder.svg"}
        alt="Profile"
        className="w-full h-full object-cover object-center"
        />
    </div>
    </div>


      {/* Cohete animado */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        animate={{
          x: rocketPosition.x,
          y: rocketPosition.y,
          rotate: (progress / 100) * 360 + 90,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <Rocket
            className={`w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 ${
              showFlames ? "animate-pulse" : ""
            }`}
          />

          {/* Efectos de partículas detrás del cohete */}
          <AnimatePresence>
            {showFlames && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-500 rounded-full"
                    initial={{
                      opacity: 1,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 2,
                      x: Math.cos((i * 45 * Math.PI) / 180) * 20,
                      y: Math.sin((i * 45 * Math.PI) / 180) * 20,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}