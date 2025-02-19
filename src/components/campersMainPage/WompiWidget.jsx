import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getSignature, saveInfo } from '../../services/wompiService';

const WompiWidget = ({ amountInCents, reference, formData, openWidget, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false); // Estado interno para abrir/cerrar el widget

  const WOMPI_PUBLIC_KEY = import.meta.env.VITE_WOMPI_PUBLIC_KEY;

  useEffect(() => {
    if (openWidget) {
      setIsWidgetOpen(true); // Sincroniza con la prop solo cuando cambia a true
    }
  }, [openWidget]);

  const initializePayment = async () => {
    if (!isWidgetOpen) return; // Evita ejecutar si el widget no debe abrirse

    try {
      setIsLoading(true);

      if (isNaN(amountInCents) || amountInCents <= 0) {
        console.error("Error: El monto no es válido", amountInCents);
        setIsLoading(false);
        return;
      }

      const signature = await getSignature(reference, amountInCents, 'COP');

      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents,
        reference,
        publicKey: WOMPI_PUBLIC_KEY,
        redirectUrl: `${window.location.origin}/success`,
        'signature:integrity': signature,
        onClose: () => {
          console.log('Widget cerrado');
          setIsWidgetOpen(false); // Permite abrirlo nuevamente
          onClose(); // Notifica a `DonationForm` que se cerró
        },
        onReady: () => console.log('Widget listo'),
        onError: (error) => {
          console.error('Error en el widget:', error);
          toast.error('Error en el proceso de pago');
        }
      });

      checkout.open(async (result) => {
        setIsLoading(false); // Termina la carga cuando el widget abre

        if (!result || !result.transaction) {
          console.error("Error: No se recibió una transacción válida", result);
          toast.error("Error al procesar el pago");
          return;
        }

        const transaction = result.transaction;
        console.log("Transacción recibida:", transaction);

        if (transaction.status === "APPROVED") {
          toast.success("¡Pago exitoso!");
          try {
            const transactionData = {
              ...Object.fromEntries(formData),
              transactionId: transaction.id,
              status: transaction.status,
            };
            await saveInfo(transactionData);
            console.log("Transacción almacenada en el backend.");
          } catch (backendError) {
            console.error("Error enviando la transacción al backend:", backendError);
            toast.error("Hubo un problema registrando la transacción.");
          }
        } else if (transaction.status === "DECLINED") {
          toast.error("Pago rechazado.");
        } else {
          toast.warning("Pago pendiente.");
        }
      });

    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      toast.error('Error al iniciar el pago');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isWidgetOpen) {
      initializePayment();
    }
  }, [isWidgetOpen]);

  return null; // No necesita renderizar nada
};

export default WompiWidget;