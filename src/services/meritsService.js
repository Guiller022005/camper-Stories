// services/meritsService.js
import axios from "axios";
import { endpoints } from "./apiConfig";

export const fetchMeritsByCamperId = async (camperId) => {
  try {
    const response = await axios.get(`${endpoints.merits}/${camperId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching merits:", error);
    throw new Error("No se pudieron cargar los méritos del camper");
  }
};

export const updateCamperMerits = async (camperId, meritsData) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  // Cambiamos a JSON
      },
    };

    console.log("meritos enviados", meritsData);

    const data = {
      meritIds: meritsData  
    };

    const url = `${endpoints.merits}/${camperId}`;

    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error("Error updating merits:", error);
    throw new Error("No se pudieron actualizar los méritos del camper");
  }
};

export const getMerits = async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endpoints.merits}`;
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

export const addMerit = async (camperId, data) => {
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

    const url = `${endpoints.merits}/${camperId}`;
    const response = await axios.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};
