// campersService.js
import axios from "axios";
import { endpoints } from "./apiConfig";
import { DEFAULT_SPONSOR_DATA } from "@/data/dataDefault";

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
  if (!data) return DEFAULT_SPONSOR_DATA;

  return {
    image_url: data.image_url || DEFAULT_SPONSOR_DATA.image_url,
    first_name: data.first_name || DEFAULT_SPONSOR_DATA.first_name,
    last_name: data.last_name || DEFAULT_SPONSOR_DATA.last_name,
    city_name: data.city_name || DEFAULT_SPONSOR_DATA.city_name,
    birth_date: calculateAge(data.birth_date) || DEFAULT_SPONSOR_DATA.birth_date,
    document_number: data.document_number || DEFAULT_SPONSOR_DATA.document_number,
    plan_price: data.plan_price || DEFAULT_SPONSOR_DATA.plan_price
  };
};

export const fetchSponsorrById = async (id) => {
    try {
      if (!id) throw new Error("ID del sponsor no proporcionado");

      const url = `${endpoints.sponsors}/${id}`;
      console.log(`🚀 URL final usada para fetch: ${url}`);

      const response = await axios.get(url);

      if (!response.data || !response.data.data) {
        throw new Error("No se encontraron datos del sponsor");
      }

      return response.data.data; // ✅ Extrae los datos correctos
    } catch (error) {
      console.error(`❌ Error fetching sponsor with id ${id}:`, error);
      throw error;
    }
};

export const fetchSponsorShipsBySponsorId = async (id) => {
    try {
        const response = await axios.get(`${endpoints.sponsors}/${id}/donations`);

        if (!response.data || response.data.length === 0) {
            // console.warn(`El Sponsor con id ${id} no tiene SponsorShips.`);
            return [];
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // console.warn(`No se encontraron SponsorShips para el Sponsor con id ${id}.`);
            return [];
        }
        // console.error(`Error al obtener SponsorShips del Sponsor con id ${id}:`, error);
        return [];
    }
};
