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
                // Validar que todos los parámetros necesarios estén presentes
                const requiredParams = ['id', 'payment_source_id', 'acceptance_token', 'status', 'reference', 'subscription_id'];
                const missingParams = requiredParams.filter(param => !searchParams.get(param));
                
                if (missingParams.length > 0) {
                    throw new Error(`Parámetros faltantes: ${missingParams.join(', ')}`);
                }

                const params = {
                    id: searchParams.get('id'),
                    payment_source_id: searchParams.get('payment_source_id'),
                    acceptance_token: searchParams.get('acceptance_token'),
                    status: searchParams.get('status'),
                    reference: searchParams.get('reference'),
                    subscription_id: searchParams.get('subscription_id')
                };

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}wompi/process-subscription`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(params)
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    toast.success('¡Suscripción exitosa! Bienvenido a nuestro programa de patrocinio.');
                    setTimeout(() => {
                        navigate('/sponsor/dashboard');
                    }, 3000);
                } else {
                    throw new Error(data.error || 'Error desconocido en la suscripción');
                }

            } catch (error) {
                console.error('Error procesando suscripción:', error);
                setStatus('error');
                toast.error(`Error al procesar la suscripción: ${error.message}`);
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
                        <p>Ha ocurrido un error al procesar tu suscripción.</p>
                        <button 
                            onClick={() => navigate('/sponsor/subscribe')}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionCallback; 