import axios from "axios";

import API_BASE_URL, { endpoints } from "./apiConfig";

export const getTechnology = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontro un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(endpoints.technology, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

export const getTechnologyForProject = async (projectId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontro un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endpoints.technologyProject}/${projectId}`;
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};
