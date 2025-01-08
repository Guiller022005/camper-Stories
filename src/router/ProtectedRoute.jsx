import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');
  
  // CREDENCIALES SIMULADAS PARA DESARROLLO

  // TRUE = AUTENTICADO
  // FALSE = SIN AUTENTICAR

  const token = true
  const role = "ADMIN"

  if (!token || !Array.isArray(allowedRoles) || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
