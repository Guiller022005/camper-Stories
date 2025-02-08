// campersService.js
import axios from "axios";
import { endpoints } from "./apiConfig";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";

const calculateAge = (birthDate) => {
  if (!birthDate) return 0;

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Si aún no ha llegado el mes de cumpleaños, o si es el mes pero no ha llegado el día
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const normalizeCalperData = (data) => {
  if (!data) return DEFAULT_CAMPER_DATA;

  return {
    profile_picture: data.profile_picture,
    full_name: data.full_name || DEFAULT_CAMPER_DATA.full_name,
    city: data.city || DEFAULT_CAMPER_DATA.city,
    age: calculateAge(data.birth_date) || DEFAULT_CAMPER_DATA.age,
    about: data.about || DEFAULT_CAMPER_DATA.about,
    processTikToks: Array.isArray(data.processTikToks)
      ? data.processTikToks
      : DEFAULT_CAMPER_DATA.processTikToks,
    main_video_url:
      data.main_video_url !== null
        ? data.main_video_url
        : DEFAULT_CAMPER_DATA.main_video_url,
  };
};

export const fetchCamperById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.campers}/${id}`);
    const normalizedData = normalizeCalperData(response.data);
    return normalizedData;
  } catch (error) {
    console.error(`Error fetching camper with id ${id}:`, error);
    return DEFAULT_CAMPER_DATA;
  }
};

// Para obtener todos los campers
export const fetchCampers = async (campus_id) => {
  try {
    const response = await axios.get(`${endpoints.campers}/${campus_id}`); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching campers with cityId ${campus_id}`, error);
    throw error;
  }
};


// Para obtener los campers egresados
export const fetchCampersEgresados = async (campus_id) => {
  try {  
    const response = await axios.get(`${endpoints.egresados}/${campus_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

// Para obtener los campers en proceso de formacion
export const fetchCampersFormacion = async (campus_id) => {
  try {
    const response = await axios.get(`${endpoints.formados}/${campus_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

// Para obtener los meritos de un camper
export const fetchMeritsCamperById = async (id) => {
  if (!id) {
    console.error("ID inválido para merits API:", id); // Debug adicional
    return [];
  }

  try {
    const response = await axios.get(endpoints.meritsbyid.replace("{id}", id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching merits for camper ${id}:`, error);
    return [];
  }
};

export const fetchAllMerits = async () => {
  try {
    const response = await axios.get(endpoints.merits);
    return response.data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

export const editCamperInfo = async (camper_id, data) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const url = `${endpoints.campers}/${camper_id}`;

    const response = await axios.put(url, data, config);

    return response.data;
  } catch (error) {
    console.error("error al enviar la data del camper", error);
    throw error;
  }
};
