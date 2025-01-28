"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

// Convierte el progreso (0..100) en coordenadas (x, y) alrededor de un círculo (radio del cohete)
function polarToCartesian(progress) {
  const angle = (progress / 100) * 360;
  const radian = (angle - 90) * (Math.PI / 180);
  const radius = 80;
  const center = 100;
  const x = center + Math.cos(radian) * radius;
  const y = center + Math.sin(radian) * radius;
  const rotation = angle + 45;
  return { x, y, rotation };
}

export function ProfileImage({ imageUrl, progress = 75 }) {
  const radius = 80;
  const fullCircumference = 2 * Math.PI * radius;
  const dashOffset = (progress / 100) * fullCircumference;

  const [showFlames, setShowFlames] = useState(false);
  const [lastProgress, setLastProgress] = useState(0);

  // Cuando sube el porcentaje, se activan las llamas 1 segundo
  useEffect(() => {
    if (progress > lastProgress) {
      setShowFlames(true);
      const timer = setTimeout(() => setShowFlames(false), 1000);
      setLastProgress(progress);
      return () => clearTimeout(timer);
    }
    setLastProgress(progress);
  }, [progress, lastProgress]);

  // Animación interna de la "curva" del cohete
  const rocketProgress = useMotionValue(0);

  // Cuando cambie "progress", animamos rocketProgress de su valor actual al nuevo
  useEffect(() => {
    rocketProgress.stop();
    animate(rocketProgress, progress, {
      duration: 2,
      ease: "easeInOut",
    });
  }, [progress, rocketProgress]);

  // Transformaciones de rocketProgress => (x, y) y rotación para el cohete
  const rocketX = useTransform(rocketProgress, (p) => polarToCartesian(p).x);
  const rocketY = useTransform(rocketProgress, (p) => polarToCartesian(p).y);
  const rocketRot = useTransform(rocketProgress, (p) => polarToCartesian(p).rotation);

  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
      {/* SVG con el círculo de progreso */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
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

        {/* Círculo gradiente principal */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          strokeDasharray={fullCircumference}
          transform="rotate(-90 100 100)"
          initial={{ strokeDashoffset: fullCircumference }}
          animate={{ strokeDashoffset: fullCircumference - dashOffset }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Círculo verde que aparece cuando progress=100 */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#33ff36" // Verde
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
          strokeDasharray={fullCircumference}
          transform="rotate(-90 100 100)"
          initial={{
            strokeDashoffset: fullCircumference,
            opacity: 0,
          }}
          animate={{
            strokeDashoffset: fullCircumference - dashOffset,
            opacity: progress === 100 ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Imagen de perfil */}
      <div className="absolute inset-6 sm:inset-8 md:inset-10 z-10">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2A2B3F] relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-overlay" />
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Profile"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* SVG con el cohete (z-20) */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.g style={{ x: rocketX, y: rocketY }}>
          <motion.g style={{ rotate: rocketRot }}>
            {/* El cohete */}
            <text
              x="0"
              y="0"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="20"
            >
              🚀
            </text>

            {/* Llamas/Partículas cuando sube el porcentaje */}
            <AnimatePresence>
              {showFlames && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.circle
                      key={i}
                      r={1}
                      fill="yellow"
                      initial={{
                        opacity: 1,
                        scale: 0,
                        cx: 0,
                        cy: 0,
                      }}
                      animate={{
                        opacity: 0,
                        scale: 2,
                        cx: Math.cos((i * 45 * Math.PI) / 180) * 20,
                        cy: Math.sin((i * 45 * Math.PI) / 180) * 20,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>
        </motion.g>
      </svg>

      {/* Texto del porcentaje */}
      <motion.div
        className="absolute z-30 pointer-events-none font-bold text-[#f7b500]"
        style={{
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
        }}
      >
        <span className="text-xs sm:text-sm md:text-base">
          {progress}%
        </span>
      </motion.div>
    </div>
  );
}
