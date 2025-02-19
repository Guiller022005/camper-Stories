import axios from "axios";
import { endpoints } from './apiConfig';

export const getSignature = async (reference, amountInCents, currency = "COP") => {
  try {
    const response = await axios.post(`${endpoints.wompi}/generate-signature`, {
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

export const saveInfo = async (transaction) => {
  try {
    // Validar que `transaction` contiene la información necesaria
    if (!transaction || !transaction.reference || !transaction.amountInCents || !transaction.currency) {
      throw new Error("La transacción no contiene datos válidos.");
    }

    // Construir el objeto con la información necesaria
    const payload = {
      reference: transaction.reference,  // Ahora enviamos `reference` en lugar de `id`
      amountInCents: transaction.amountInCents,
      currency: transaction.currency,
      paymentMethodType: transaction.paymentMethodType,
      status: transaction.status,
      signature: transaction.signature,
      customerData: {
        id: null,
        fullName: transaction.customerData.fullName || "Desconocido",
      },
    };

    console.log("Enviando transacción al backend:", payload);

    // Enviar la información al backend
    const response = await axios.post(`${endpoints.wompi}/save-info`, payload);

    // Retornar la respuesta del backend
    return response.data;
  } catch (error) {
    console.error("Error enviando la transacción al backend:", error.response?.data || error.message);
    throw new Error("No se pudo enviar la transacción al backend");
  }
};
