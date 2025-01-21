import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import campushm from "/src/assets/Campushm.png";
import { toast } from "react-toastify";
import { endpoints } from "../../services/apiConfig";

export default function PasswordRecoveryForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    if (!email) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(endpoints.passwordRecovery, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      console.log("Respuesta completa:", responseData);

      if (response.ok) {
        toast.success(responseData.message || "¡Enlace de recuperación enviado! Revisa tu correo electrónico.");
        navigate("/campers/login");
      } else {
        const errorMessage = responseData.message || "Error al enviar el enlace de recuperación. Intenta nuevamente.";
        console.error("Error detallado:", responseData);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error completo:", err);
      toast.error("Error de red: No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#1a1a2e] flex items-center justify-center p-6">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative">
        {/* Efecto de borde brillante */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6b5ffd20] via-[#6b5ffd40] to-[#6b5ffd20] rounded-2xl blur-md"></div>

        <div className="w-full bg-[#2a2a3e] p-4 lg:p-8 border border-[#6b5ffd] rounded-2xl shadow-[0_0_30px_-6px_#6b5ffd] relative z-10">
          {/* Logo y Título */}
          <div className="text-center mb-5 space-y-2">
            <div className="flex justify-center">
              <div className="w-24 lg:w-32">
                <img src={campushm} alt="Campus" className="w-full h-auto mx-auto" />
              </div>
            </div>
            <h1 className="text-xl text-white font-bold">Recuperar Contraseña</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Correo Electrónico */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white text-sm">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                  className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                           focus:ring-2 focus:ring-[#7c3aed] border-none"
                />
              </div>
            </div>

            {/* Descripcion*/}
            <div className="text-center mb-5 space-y-2">
            
            <h1 className="text-sm  text-white text-opacity-70">Enviaremos un link a tu correo electrónico para que puedas restablecer tu contraseña</h1>
          </div>

            {/* Botón para Enviar */}
            <button
              type="submit"
              className="w-full h-11 bg-[#6C3AFF] hover:bg-[#6d28d9] text-white rounded-lg
                       transition-colors duration-200 flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Enviar Enlace de Recuperación"
              )}
            </button>

            {/* Link de inicio de sesión */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/campers/login")}
                className="text-[#7c3aed] text-sm hover:text-[#6d28d9] transition-colors duration-200"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
