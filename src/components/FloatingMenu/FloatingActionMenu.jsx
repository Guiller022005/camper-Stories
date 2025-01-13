import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, Edit, LogOut, Eye } from 'lucide-react';

const FloatingActionMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
    const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));

    // Verificar si hay token al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Actualiza el estado según si el token existe
    }, []);

    const handleToggleProfile = () => {
        if (location.pathname.includes('/edit')) {
            navigate(`/campers/profile/${camperIdFromStorage}`);
        } else {
            navigate(`/campers/profile/${camperIdFromStorage}/edit`);
        }
    };

    const handleLogout = () => {
        setIsOpen(false);
        const logoutUrl = `${import.meta.env.VITE_API_BASE_URL}users/logout`;

        fetch(logoutUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Logout failed');
                }
                localStorage.removeItem('token');
                navigate('/campers/login');
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    // Renderizar solo si está logueado
    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="absolute bottom-16 right-0 mb-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200">
                    <ul className="py-2">
                        <li>
                            <button
                                onClick={handleToggleProfile}
                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                                {location.pathname.includes('/edit') ? <Eye size={18} /> : <Edit size={18} />}
                                {location.pathname.includes('/edit') ? 'Ver Perfil' : 'Editar Perfil'}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Opciones"
                className={`p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                }`}
            >
                <Settings size={24} />
            </button>
        </div>
    );
};

export default FloatingActionMenu;
