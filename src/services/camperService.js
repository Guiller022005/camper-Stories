// campersService.js
import axios from 'axios';
import { endpoints } from './apiConfig';

// Función base para obtener un camper por ID
export const fetchCamperById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.campers}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching camper with id ${id}:`, error);
    throw error;
  }
};

// Para obtener todos los campers
export const fetchCampers = async () => {
  try {
    const response = await axios.get(endpoints.campers);
    return response.data;
  } catch (error) {
    console.error('Error fetching campers:', error);
    throw error;
  }
};