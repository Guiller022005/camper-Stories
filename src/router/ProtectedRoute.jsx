import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Verificar si el token existe
  if (!token) {
    toast.error("No estás autenticado. Por favor, inicia sesión.");
    return <Navigate to="/campers/login" />;
  }

  try {
    // Decodificar el token para verificar su expiración
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    // Verificar si el token ha expirado
    if (currentTime > expirationTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
      return <Navigate to="/campers/login" />;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    toast.error("Error al validar la sesión.");
    return <Navigate to="/campers/login" />;
  }

  // Verificar el rol
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    toast.error("No tienes permiso para acceder a esta página.");
    return <Navigate to="/campers/login" />;
  }

  return children; // Si todo está bien, se renderiza el contenido protegido
};

export default ProtectedRoute;
