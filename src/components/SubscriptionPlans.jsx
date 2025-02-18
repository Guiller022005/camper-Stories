import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import WompiSubscription from './campersMainPage/WompiSubscription';
import LoginForm from './auth/LoginForm'; // Asumiendo que tienes este componente
import RegisterForm from './auth/RegisterForm'; // Asumiendo que tienes este componente

const SubscriptionPlans = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const plans = [
        { id: 1, name: "Plan Básico", price: { monthly: 29900 }, features: ["Feature 1", "Feature 2"] },
        { id: 2, name: "Plan Estándar", price: { monthly: 49900 }, features: ["Feature 1", "Feature 2", "Feature 3"] },
        { id: 3, name: "Plan Premium", price: { monthly: 99900 }, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] }
    ];

    const handlePlanSelection = (plan) => {
        if (!isAuthenticated) {
            setSelectedPlan(plan);
            setShowAuthModal(true);
        } else {
            // Si el usuario está autenticado, mostrar directamente el widget de Wompi
            setSelectedPlan(plan);
        }
    };

    const handleAuthSuccess = (userData) => {
        setShowAuthModal(false);
        // El plan ya está seleccionado, el widget de Wompi se mostrará automáticamente
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                    <p className="text-2xl font-bold mb-4">
                        ${plan.price.monthly.toLocaleString()} /mes
                    </p>
                    <ul className="mb-6">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="mb-2">✓ {feature}</li>
                        ))}
                    </ul>
                    {isAuthenticated ? (
                        <WompiSubscription 
                            plan={plan}
                            customerData={{
                                email: user.email,
                                name: user.name
                            }}
                        />
                    ) : (
                        <button
                            onClick={() => handlePlanSelection(plan)}
                            className="w-full bg-gradient-to-r from-[#6366F1] to-[#6366F1] hover:opacity-90 transition-opacity font-bold py-2 px-4 rounded-lg text-white"
                        >
                            Seleccionar Plan
                        </button>
                    )}
                </div>
            ))}

            {showAuthModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Inicia sesión o regístrate para continuar</h2>
                        <LoginForm onSuccess={handleAuthSuccess} />
                        <RegisterForm onSuccess={handleAuthSuccess} />
                        <button 
                            onClick={() => setShowAuthModal(false)}
                            className="mt-4 text-gray-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPlans; 