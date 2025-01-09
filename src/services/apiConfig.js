const API_BASE_URL = 'http://localhost:5000/';

export const endpoints = {
  login: `${API_BASE_URL}users/login`,   // Endpoint para inicio de sesión
  register: `${API_BASE_URL}users/register` // Endpoint para crear usuarios
};

export default API_BASE_URL;
