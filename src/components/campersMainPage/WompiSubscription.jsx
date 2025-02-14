import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const WompiSubscription = ({ plan, customerData }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initializeSubscription = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}wompi/init-subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    planId: plan.id,
                    customerData: customerData,
                    amount: plan.price.monthly
                })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            // Configurar widget de Wompi
            const checkout = new window.WidgetCheckout({
                currency: 'COP',
                amountInCents: data.amountInCents,
                reference: data.reference,
                publicKey: data.publicKey,
                redirectUrl: `${window.location.origin}/subscription/callback`,
                subscriptionData: {
                    recurring: true,
                    installments: 12 // Pagos mensuales por un año
                }
            });

            checkout.open();

        } catch (error) {
            toast.error('Error al iniciar la suscripción: ' + error.message);
            console.error('Error iniciando suscripción:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={initializeSubscription}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6366F1] to-[#6366F1] hover:opacity-90 transition-opacity font-bold py-2 px-4 rounded-lg text-white"
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Procesando...</span>
                </div>
            ) : (
                "Suscribirse ahora"
            )}
        </button>
    );
};

export default WompiSubscription; 