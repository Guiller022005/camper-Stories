import axios from "axios";
import { endpoints } from './apiConfig';

export const getSignature = async (reference, amountInCents, currency = "COP") => {
  try {
    const response = await axios.post(`${endpoints.payments}/generate-signature`, {
      reference,
      amountInCents,
      currency,
    });

    return response.data.signature;
  } catch (error) {
    console.error("Error obteniendo la firma:", error.response?.data || error.message);
    throw new Error("No se pudo obtener la firma de Wompi");
  }
};
