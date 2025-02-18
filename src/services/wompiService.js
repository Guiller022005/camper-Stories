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

export const initializeSubscription = async (planData) => {
    try {
        console.log('Datos enviados a init-subscription:', planData); // Debugging

        if (!planData.customerData || !planData.customerData.sponsorId) {
            throw new Error('Datos del sponsor no válidos');
        }

        const response = await axios.post(endpoints.subscriptions.init, {
            planId: planData.planId,
            customerData: planData.customerData,
            amount: planData.amount,
            frequency: planData.frequency
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Respuesta de init-subscription:', response.data); // Debugging

        if (!response.data.success) {
            throw new Error(response.data.message || 'Error en la inicialización de la suscripción');
        }

        return {
            success: true,
            amountInCents: response.data.amountInCents,
            reference: response.data.reference,
            publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY
        };
    } catch (error) {
        console.error("Error en initializeSubscription:", {
            message: error.message,
            response: error.response?.data,
            data: error.response?.data
        });
        
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("No se pudo iniciar la suscripción");
    }
};
