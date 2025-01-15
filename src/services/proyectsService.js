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

    console.log(token);

    if (!token) {
      throw new Error("No se enconteo un token, porfavor inicia sesion");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };

    const url = `${endpoints.addProjects}`;
    console.log("TEST DATA", data);
    const response = await axios.post(url, data, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching the data", error);
    throw error;
  }
};
export const updateProject = async (camper_id, project_id, data) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    
    // Agregar campos básicos
    formData.append('project_id', data.project_id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('code_url', data.code_url);
    
    // Forzar que technologyIds sea siempre un array
    // Si solo hay un valor, lo envolvemos en un array antes de iterar
    const technologiesArray = Array.isArray(data.technologyIds) ? data.technologyIds : [data.technologyIds];
    
    // Usar URLSearchParams para mantener múltiples valores para la misma clave
    technologiesArray.forEach(id => {
      formData.append('technologyIds', id.toString());
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    };

    const url = `${endpoints.addProjects}/${camper_id}/${project_id}`;
    const response = await axios.put(url, formData, config);

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
