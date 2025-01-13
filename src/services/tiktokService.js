import axios from 'axios';
import { endpoints } from './apiConfig';

export const fetchTikToksByCamperId = async (id) => {
    try {
        const response = await axios.get(`${endpoints.campers}/${id}/videos`);
        return response.data || []; // Retornar solo los datos
    } catch (error) {
        console.error(`Error fetching camper tik toks with id ${id}:`, error);
        return []; // Retornar array vacío en caso de error
    }
}