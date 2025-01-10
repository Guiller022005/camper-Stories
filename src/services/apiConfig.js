const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  login: `${API_BASE_URL}users/login`, // Endpoint para inicio de sesión
  register: `${API_BASE_URL}users/register`, // Endpoint para crear usuarios
  campers: `${API_BASE_URL}campers`, // Endpoint para crear sueno
  dreams: `${API_BASE_URL}campers/{id}/dreams`,
  tiktoks: `${API_BASE_URL}campers/{id}/videos`,
  city: `${API_BASE_URL}cities`, // Endpoint para crear sueno
  technologuies: `${API_BASE_URL}technologuies`,
  projects: `${API_BASE_URL}campers/{id}/proyects`,
};

export default API_BASE_URL;
