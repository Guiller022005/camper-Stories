const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  login: `${API_BASE_URL}users/login`, // Endpoint para inicio de sesión
  register: `${API_BASE_URL}users/register`, // Endpoint para crear usuarios
  passwordRecovery: `${API_BASE_URL}password-reset/request-reset`, // Endpoint para recuperar la contraseña
  resetPassword: `${API_BASE_URL}password-reset/reset-password`, // Endpoint para enviar la nueva contraseña
  campers: `${API_BASE_URL}campers`, // Endpoint para crear sueno
  egresados: `${API_BASE_URL}campers/graduates`, // Endpoint para obtener campers egresados
  formados: `${API_BASE_URL}campers/trainees`, // Endpoint para obtener campers en proceso de formacion
  merits: `${API_BASE_URL}merits`,
  dreams: `${API_BASE_URL}dreams`,
  tiktoks: `${API_BASE_URL}campers/{id}/videos`,
  city: `${API_BASE_URL}cities`, // Endpoint para crear sueno
  technology: `${API_BASE_URL}technology`,
  projects: `${API_BASE_URL}campers/{id}/proyects`,
  technologyProject: `${API_BASE_URL}projects/technologies`,
  addProjects: `${API_BASE_URL}projects`,
  meritsbyid: `${API_BASE_URL}merits/{id}`,
  sponsors: `${API_BASE_URL}sponsors`,
  sponsorsRegister: `${API_BASE_URL}sponsors/create`,
  payments: `${API_BASE_URL}wompi`,
  subscriptions: {
    init: `${API_BASE_URL}wompi/init-subscription`,
    process: `${API_BASE_URL}wompi/process-subscription`,
    cancel: `${API_BASE_URL}wompi/cancel-subscription`,
    get: `${API_BASE_URL}wompi/subscription`
  }
};

export default API_BASE_URL;
