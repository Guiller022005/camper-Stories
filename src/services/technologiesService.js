import axios from "axios";

import API_BASE_URL, { endpoints } from "./apiConfig";

export const getTechnology = async () => {
  try {
    // const token = localStorage.getItem("token");
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA5LCJlbWFpbCI6InBlZHJhemFtYWxkb25hZG9uQGdtYWlsLmNvbSIsInJvbGUiOiJjYW1wZXIiLCJpYXQiOjE3MzY1NDQ1NDYsImV4cCI6MTczNjYzMDk0Nn0.wF-NmQUBNKrxGLl2roJ4D-p4wCYDPu-GJGup2kygJ2I"
    
    if (!token) {
      throw new Error("No se encontro un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(endpoints.technology, config);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};
