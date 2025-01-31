import useWompi from "../hooks/useWompi";

const WompiWidget = ({ amountInCents, reference, signature, publicKey, currency = "COP", redirectUrl = "http://localhost:5173/resultado-pago" }) => {
  const { isLoaded } = useWompi();

  const openWompiWidget = () => {
    if (!isLoaded) {
      console.error("El widget de Wompi aún no está cargado.");
      return;
    }

    const checkout = new window.WompiCheckoutWidget({
      currency,
      amountInCents,
      reference,
      publicKey,
      signature,
      redirectUrl,
    });

    checkout.open((result) => {
      console.log("Resultado del pago:", result);
    });
  };

  return (
    <button onClick={openWompiWidget} className="bg-blue-500 text-white p-3 rounded">
      Pagar con Wompi
    </button>
  );
};

export default WompiWidget;
