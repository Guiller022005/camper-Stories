import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const SubscriptionCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');

    useEffect(() => {
        const processSubscription = async () => {
            try {
                const params = {
                    id: searchParams.get('id'),
                    payment_source_id: searchParams.get('payment_source_id'),
                    acceptance_token: searchParams.get('acceptance_token'),
                    status: searchParams.get('status'),
                    reference: searchParams.get('reference')
                };

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}wompi/process-subscription`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(params)
                });

                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    toast.success('¡Suscripción exitosa!');
                    setTimeout(() => {
                        navigate('/sponsor/dashboard');
                    }, 2000);
                } else {
                    throw new Error(data.error);
                }

            } catch (error) {
                console.error('Error procesando suscripción:', error);
                setStatus('error');
                toast.error('Error al procesar la suscripción');
            }
        };

        processSubscription();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1b2b] to-[#1e203a]">
            <div className="text-center p-8 rounded-lg">
                {status === 'processing' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin w-12 h-12 text-indigo-500 mb-4" />
                        <p className="text-white text-xl">Procesando tu suscripción...</p>
                    </div>
                )}
                {status === 'success' && (
                    <div className="text-white">
                        <h2 className="text-2xl font-bold mb-4">¡Suscripción exitosa!</h2>
                        <p>Redirigiendo al dashboard...</p>
                    </div>
                )}
                {status === 'error' && (
                    <div className="text-red-500">
                        <h2 className="text-2xl font-bold mb-4">Error en la suscripción</h2>
                        <p>Por favor, intenta nuevamente más tarde.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionCallback; 