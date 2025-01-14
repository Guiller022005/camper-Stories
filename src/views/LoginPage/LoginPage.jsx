import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Lock, Mail } from 'lucide-react';
import { Label } from "@/components/ui/label";
import campushm from '/src/assets/Campushm.png';
import { endpoints } from '../../services/apiConfig';
import { CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const notify = () => toast("Wow so easy!");


  useEffect(() => {
    if (token) {
      const camperId = localStorage.getItem('camper_id');
      console.log("Usuario ya autenticado. Redirigiendo a /");
      navigate(`/campers/profile/${camperId}/edit`);
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      console.log("Iniciando sesión con:", email);
      const response = await fetch(endpoints.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Inicio de sesión exitoso");

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('camper_id', data.user.camper_id);
        console.log("Inicio de sesión exitoso. Token recibido:", data);
        navigate(`/campers/profile/${data.user.camper_id}/edit`);


      } else {
        console.error("Error de autenticación. Credenciales incorrectas.");
        toast.error("Error de autenticación. Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      toast.error("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");

    }
};

  return (
    <div className="min-h-screen w-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-8 gap-12 font-sans">
      {/* Main Container */}
      <div className="w-full px-80 max-w-7xl flex gap-8 items-stretch">
        {/* Form Panel */}
        <div className="flex-1 bg-[#2a2a3e] p-8 border border-[#6b5ffd] rounded-2xl shadow-[0_10px_50px_-3px_#6b5ffd] text-center">
          <div className="form-logo">
            <CardHeader className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-40 h-auto">
                  <img src={campushm} alt="Campus" className="w-40 h-auto mx-auto" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                Camper Stories
              </CardTitle>
            </CardHeader>
          </div>

          <h2 className="text-white text-xl mb-7 text-center font-regular">¡Bienvenido de nuevo, Camper!</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin(email, password);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-left block">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-left block">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  placeholder="Contraseña"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 px-4 rounded-lg text-base cursor-pointer transition-colors duration-300 bg-[#6C3AFF] text-white hover:bg-[#6d28d9]">
              Iniciar Sesión
            </button>
            {/* <button type="button" className="w-full py-3 px-4 rounded-lg text-base cursor-pointer transition-colors duration-300 bg-white text-gray-800 flex items-center justify-center gap-2 hover:bg-gray-100">
              Continuar con Google
            </button> */}
          </form>

          <div className="text-center mt-6">
            <button
              className="bg-transparent border-none text-[#7c3aed] cursor-pointer text-sm hover:text-[#6d28d9]"
              onClick={() => navigate('/campers/register')}
            >
              ¿No tienes cuenta aún? Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;