import axios from "axios";

import API_BASE_URL, { endpoints } from "./apiConfig";

export const getDreams = async (camperId) => {
  try {
    const url = `${endpoints.campers}/${camperId}/dreams`;
    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      // console.warn(`El camper con id ${camperId} no tiene sueños registrados.`);
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // console.warn(`No se encontraron sueños para el camper con id ${camperId}.`);
      return [];
    }
    
    console.error("Error fetching the data:", error);
    throw error;
  }
};

export const addDreams = async (camperId, data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se enconteo un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };

    const url = `${endpoints.dreams}`;
    console.log(url)
    const response = await axios.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

export const deleteDreams = async (camperId, data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se enconteo un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endpoints.campers}/${camperId}/dreams`;
    const response = await axios.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};


export const deleteDream = async (camperId, dreamId) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endpoints.campers}/${camperId}/dreams/${dreamId}`;
    const response = await axios.delete(url, config);

    return response.data;
  } catch (error) {
    console.error("Error deleting dream:", error);
    throw error;
  }
};
// POST /api/campers/{id}/dreams -
// DELETE /api/campers/{id}/dreams/{dream_id}
