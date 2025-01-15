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

