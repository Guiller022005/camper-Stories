import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const WompiSubscription = ({ plan, customerData }) => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const handleSubscriptionClick = async () => {
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}wompi/init-subscription`, {
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

            // Redirigir al usuario a la página de suscripción
            window.location.href = data.redirectUrl;
        } catch (error) {
            console.error('Error iniciando suscripción:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const Modal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1A1D2E] border border-gray-600 rounded-xl p-6 w-96 relative">
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-4">Registro requerido</h2>
                <p className="text-gray-300 mb-6">
                    Para suscribirte a nuestros planes de patrocinio, necesitas registrarte como sponsor.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/register/sponsor')}
                        className="w-full bg-gradient-to-r from-[#6366F1] to-[#6366F1] hover:opacity-90 transition-opacity font-bold py-2 px-4 rounded-lg text-white"
                    >
                        Registrarse como Sponsor
                    </button>
                    <button
                        onClick={() => navigate('/login/sponsor')}
                        className="w-full bg-transparent border border-[#6366F1] hover:bg-[#6366F1]/10 transition-colors font-bold py-2 px-4 rounded-lg text-white"
                    >
                        Ya tengo una cuenta
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
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
            {showModal && <Modal />}
        </>
    );
};

export default WompiSubscription; 