import axios from "axios";

import API_BASE_URL, { endpoints } from "./apiConfig";

export const getProjects = async (camperId) => {
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

    const url = `${endpoints.campers}/${camperId}/proyects`;
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

export const addProjects = async (camperId, data) => {
  try {
    // const token = localStorage.getItem("token");
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA5LCJlbWFpbCI6InBlZHJhemFtYWxkb25hZG9uQGdtYWlsLmNvbSIsInJvbGUiOiJjYW1wZXIiLCJpYXQiOjE3MzY1NDQ1NDYsImV4cCI6MTczNjYzMDk0Nn0.wF-NmQUBNKrxGLl2roJ4D-p4wCYDPu-GJGup2kygJ2I"

    if (!token) {
      throw new Error("No se enconteo un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endpoints.campers}/${camperId}/proyects`;
    const response = await axios.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

// export const deleteDreams = async (camperId, data) => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       throw new Error("No se enconteo un token, porfavor inicia sesion");
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const url = `${endpoints.campers}/${camperId}/dreams`;
//     const response = await axios.post(url, data, config);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching the data", error);
//     throw error;
//   }
// };

// POST /api/campers/{id}/dreams -
// DELETE /api/campers/{id}/dreams/{dream_id}
