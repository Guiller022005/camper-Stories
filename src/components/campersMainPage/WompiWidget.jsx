import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getSignature } from '../../services/wompiService';

const WompiWidget = ({ amountInCents, reference }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      const cleanReference = reference.toString().trim();
      const cleanAmount = parseInt(amountInCents, 10);
      
      const signature = await getSignature(cleanReference, cleanAmount, 'COP');

      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents: cleanAmount,
        reference: cleanReference,
        publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
        redirectUrl: `${window.location.origin}/success`,
        signature: signature,
        // Agregamos los callbacks necesarios
        onClose: () => {
          console.log('Widget cerrado');
        },
        onReady: () => {
          console.log('Widget listo');
        },
        onError: (error) => {
          console.error('Error en el widget:', error);
        },
        onApproved: (transaction) => {
          console.log('Transacción aprobada:', transaction);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        onRejected: (transaction) => {
          console.log('Transacción rechazada:', transaction);
          // Aquí puedes mostrar un mensaje de error o tomar otra acción
        }
      });

      checkout.open();
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      alert('Hubo un error al iniciar el pago. Por favor, intenta de nuevo.');
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
      onClick={handlePayment}
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