import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, Home } from 'lucide-react';

const ErrorPage = ({ 
  title = "¡Ups! Algo salió mal", 
  message = "Lo sentimos, ha ocurrido un error inesperado.",
  error = "404" 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0B1A] p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <XCircle 
              className="w-24 h-24 text-[#FFB800] animate-pulse" 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Error Code */}
        <div className="relative">
          <h1 className="text-8xl font-bold text-[#FFB800] opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {error}
          </h1>
          <h2 className="text-3xl font-bold text-white relative">
            {title}
          </h2>
        </div>

        {/* Error Message */}
        <p className="text-gray-400 text-lg">
          {message}
        </p>

        {/* Action Button */}
        <div className="pt-6">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-[#1E213D] hover:bg-[#2A2E4D] 
                       text-white rounded-lg transition-colors duration-200 gap-2 
                       border border-[#FFB800]/20 hover:border-[#FFB800]/40"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800]/20 to-transparent" />
      </div>
    </div>
  );
};

export default ErrorPage;

