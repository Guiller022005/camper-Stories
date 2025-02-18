import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const WompiSubscription = ({ plan, customerData }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubscriptionClick = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('http://localhost:5000/wompi/init-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    planId: plan.id,
                    customerData: {
                        email: customerData.email,
                        name: customerData.name
                    },
                    frequency: 'monthly'
                })
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error || 'Error iniciando suscripción');
            }

            console.log('Suscripción inicializada:', data);
            // Aquí puedes inicializar el widget de Wompi con los datos
            return data;
        } catch (error) {
            console.error('Error iniciando suscripción:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSubscriptionClick}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6366F1] to-[#6366F1] hover:opacity-90 transition-opacity font-bold py-2 px-4 rounded-lg text-white"
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Procesando...</span>
                </div>
            ) : (
                <span>Suscribirse</span>
            )}
        </button>
    );
};

export default WompiSubscription; 