import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1b2b] to-[#1e203a] text-white text-center px-4">
      {/* Icono animado */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl mb-6"
      >
        404
      </motion.div>

      <h1 className="text-3xl font-bold mb-2">Pagina no encontrada.</h1>
      <p className="text-gray-400 text-lg mb-6">
        Esta página no existe o no tienes permiso para verla.
      </p>

      {/* Botón de regreso */}
      <Link
        to="/"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Unauthorized;
