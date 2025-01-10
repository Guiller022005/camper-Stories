// campersService.js
import axios from 'axios';
import { endpoints } from './apiConfig';
import { DEFAULT_CAMPER_DATA } from '@/data/dataDefault';

const normalizeCalperData = (data) => {
  if (!data) return DEFAULT_CAMPER_DATA;

  return {
    profile_picture: data.profile_picture || DEFAULT_CAMPER_DATA.profile_picture,
    full_name: data.full_name || DEFAULT_CAMPER_DATA.full_name,
    city: data.city || DEFAULT_CAMPER_DATA.city,
    age: data.age || DEFAULT_CAMPER_DATA.age,
    merits: Array.isArray(data.merits) ? data.merits : DEFAULT_CAMPER_DATA.merits,
    projects: Array.isArray(data.projects) ? data.projects : DEFAULT_CAMPER_DATA.projects,
    dreams: Array.isArray(data.dreams) ? data.dreams : DEFAULT_CAMPER_DATA.dreams,
    about: data.about || DEFAULT_CAMPER_DATA.about,
    processTikToks: Array.isArray(data.processTikToks) ? data.processTikToks : DEFAULT_CAMPER_DATA.processTikToks,
  };
};

// Función base para obtener un camper por ID
export const fetchCamperById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.campers}/${id}`);
    return normalizeCalperData(response.data);
  } catch (error) {
    console.error(`Error fetching camper with id ${id}:`, error);
    return DEFAULT_CAMPER_DATA;
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