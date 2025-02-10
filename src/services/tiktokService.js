import axios from 'axios';
import { endpoints } from './apiConfig';

export const fetchTikToksByCamperId = async (id) => {
    try {
        const response = await axios.get(`${endpoints.campers}/${id}/videos`);

        if (!response.data || response.data.length === 0) {
            // console.warn(`El camper con id ${id} no tiene TikToks.`);
            return [];
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // console.warn(`No se encontraron TikToks para el camper con id ${id}.`);
            return [];
        }
        // console.error(`Error al obtener TikToks del camper con id ${id}:`, error);
        return [];
    }
};

export const addTikTok = async (tiktokData, camper_id) => {
    console.log(tiktokData);
    console.log(camper_id);
    try {
        // Obtener el token
        const token = localStorage.getItem('token');

        const response = await axios.post(
            `${endpoints.campers}/${camper_id}/videos`, 
            {
                title: tiktokData.title,
                video_url: tiktokData.video_url,
                platform: "TikTok"
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding TikTok:', error);
        throw error;
    }
}

