// services/meritsService.js
import axios from 'axios';
import { endpoints } from './apiConfig';

export const fetchMeritsByCamperId = async (camperId) => {
    try {
        const response = await axios.get(`${endpoints.merits}/${camperId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching merits:', error);
        throw new Error('No se pudieron cargar los méritos del camper');
    }
};

export const updateCamperMerits = async (camperId, meritsData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/merits/camper/${camperId}`, meritsData);
        return response.data;
    } catch (error) {
        console.error('Error updating merits:', error);
        throw new Error('No se pudieron actualizar los méritos del camper');
    }
};