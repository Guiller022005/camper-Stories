import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Settings, Edit, LogOut, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

const FloatingActionMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('floating-menu');
            const button = document.getElementById('menu-button');
            if (isOpen && menu && button && 
                !menu.contains(event.target) && 
                !button.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleToggleProfile = () => {
        if (location.pathname.includes('/edit')) {
            navigate(`/campers/profile/${camperIdFromStorage}`);
        } else {
            navigate(`/campers/profile/${camperIdFromStorage}/edit`);
        }
        setIsOpen(false);
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
                    toast.error("Error. Por favor, inténtalo de nuevo.");
                    throw new Error('Logout failed');
                }
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('camper_id');
                toast.success("¡Hasta pronto! Has cerrado sesión exitosamente.");
                navigate('/campers/login');
            })
            .catch((error) => {
                toast.error("Error. Por favor, inténtalo de nuevo.");
                console.error('Error during logout:', error);
            });
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-7 z-50">
            <div
                id="floating-menu"
                className={`absolute bottom-14 right-0 mb-2 w-52 rounded-xl bg-white shadow-lg border border-gray-200
                    transform transition-all duration-300 ease-in-out origin-bottom-right
                    ${isOpen 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`}
            >
                <ul className="py-2 space-y-1">
                    <li className="px-1">
                        <button
                            onClick={handleToggleProfile}
                            className="w-full px-4 py-3 text-left rounded-lg
                                     flex items-center gap-3 transition-all duration-200
                                     text-blue-700 hover:bg-blue-50 hover:pl-5
                                     group"
                        >
                            {location.pathname.includes('/edit') ? (
                                <Eye 
                                    className="transition-transform duration-200 group-hover:scale-110 text-blue-600" 
                                    size={18} 
                                />
                            ) : (
                                <Edit 
                                    className="transition-transform duration-200 group-hover:scale-110 text-blue-600" 
                                    size={18} 
                                />
                            )}
                            <span className="font-medium">
                                {location.pathname.includes('/edit') ? 'Ver Perfil' : 'Editar Perfil'}
                            </span>
                        </button>
                    </li>
                    <li className="px-1">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left rounded-lg
                                     flex items-center gap-3 transition-all duration-200
                                     text-red-700 hover:bg-red-50 hover:pl-5
                                     group"
                        >
                            <LogOut 
                                className="transition-transform duration-200 group-hover:scale-110 text-red-600" 
                                size={18} 
                            />
                            <span className="font-medium">Cerrar Sesión</span>
                        </button>
                    </li>
                </ul>
            </div>

            <button
                id="menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Opciones"
                className={`p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg
                           transform transition-all duration-300 ease-in-out
                           hover:scale-105 active:scale-95
                           ${isOpen ? 'rotate-180 bg-blue-700' : 'rotate-0'}`}
            >
                <Settings size={24} />
            </button>
        </div>
    );
};

export default FloatingActionMenu;