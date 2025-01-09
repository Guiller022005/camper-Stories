const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  login: `${API_BASE_URL}users/login`,   // Endpoint para inicio de sesión
  register: `${API_BASE_URL}users/register`, // Endpoint para crear usuarios
  city: `${API_BASE_URL}cities`
};

export default API_BASE_URL;
