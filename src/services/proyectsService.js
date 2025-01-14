import axios from "axios";

import API_BASE_URL, { endpoints } from "./apiConfig";

export const getProjects = async (camperId) => {
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

    const url = `${endpoints.campers}/${camperId}/proyects`;
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};

export const addProjects = async (data) => {
  try {
    const token = localStorage.getItem("token");

    console.log(token)

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

    const url = `${endpoints.addProjects}`;
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
