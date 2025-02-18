import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getSignature } from '../../services/wompiService';
import { saveInfo } from '../../services/wompiService';
import { toast } from 'react-toastify';

const WompiWidget = ({ amountInCents, reference }) => {
  const [isLoading, setIsLoading] = useState(false);

  const WOMPI_PUBLIC_KEY = import.meta.env.VITE_WOMPI_PUBLIC_KEY;

  const handleClickOnDev = () => {
    toast.info("Esta opcion aun se encuenta en desarrollo. Vuelve Pronto!")
  };

  const initializePayment = async () => {
    try {

      setIsLoading(true);


      if (isNaN(amountInCents) || amountInCents <= 0) {
        console.error("Error: El monto no es válido", amountInCents);
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
        },
        onReady: () => {
          console.log('Widget listo');
        },
        onError: (error) => {
          console.error('Error en el widget:', error);
          toast.error('Error en el proceso de pago');
        }
      });

      checkout.open(async (result) => {
        if (!result || !result.transaction) {
          console.error("Error: No se recibió una transacción válida", result);
          toast.error("Error al procesar el pago");
          return;
        }

        const transaction = result.transaction;
        console.log("Transacción recibida:", transaction);

        if (transaction.status === "APPROVED") {
          toast.success("¡Pago exitoso!");
        } else if (transaction.status === "DECLINED") {
          toast.error("Pago rechazado.");
        } else {
          toast.warning("Pago pendiente.");
        }

        // **ENVIAR LA TRANSACCIÓN AL BACKEND**
        try {
          const response = await saveInfo(transaction); // Utiliza el servicio `saveInfo`
          console.log("Transacción almacenada en el backend:", response);
        } catch (backendError) {
          console.error("Error enviando la transacción al backend:", backendError);
          toast.error("Hubo un problema registrando la transacción.");
        }

      });

    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      toast.error('Error al iniciar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <button
      onClick={initializePayment}
      // onClick={handleClickOnDev} onClick para DESACTIVAR PAGOS EN PRODUCCION
      disabled={isLoading}
      className="w-full p-3 rounded-md font-bold text-white text-lg bg-[#382394] hover:bg-[#2a1b6e] transition-colors"
    >
      {isLoading ? 'Cargando...' : (
        <>
          Paga Ahora con Wompi <ArrowRight className="h-5 w-5 inline pb-[2px]" />
        </>
      )}
    </button>
  );
};

export default WompiWidget;