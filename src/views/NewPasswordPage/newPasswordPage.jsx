import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import campushm from "/src/assets/Campushm.png";
import { toast } from "react-toastify";
import { endpoints } from "../../services/apiConfig";

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Expresión regular para validar contraseñas seguras
  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function onSubmit(event) {
    event.preventDefault();

    // Validación: Verificar que ambos campos estén completos
    if (!password || !confirmPassword) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    // Validación: Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden. Inténtalo nuevamente.");
      return;
    }

    // Validación: Asegurarse de que la contraseña cumple con las reglas de seguridad
    if (!passwordValidationRegex.test(password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar la solicitud para actualizar la contraseña al servidor
      const response = await fetch(endpoints.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success("¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.");
        navigate("/campers/login");
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.error || "Error al actualizar la contraseña. Intenta nuevamente.";
        toast.error(errorMessage);
      }
    } catch (err) {
      // Manejo de errores de red
      toast.error("Error de red: No se pudo conectar con el servidor.");
      console.error("Error:", err);
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
          {/* Sección del logo y el título */}
          <div className="text-center mb-5 space-y-2">
            <div className="flex justify-center">
              <div className="w-24 lg:w-32">
                <img src={campushm} alt="Campus" className="w-full h-auto mx-auto" />
              </div>
            </div>
            <h1 className="text-xl text-white font-bold">Establecer Nueva Contraseña</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Campo para la nueva contraseña */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white text-sm">Nueva Contraseña</Label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-11 pl-3 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                         focus:ring-2 focus:ring-[#7c3aed] border-none"
              />
            </div>

            {/* Campo para confirmar la contraseña */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-white text-sm">Confirmar Contraseña</Label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="w-full h-11 pl-3 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                         focus:ring-2 focus:ring-[#7c3aed] border-none"
              />
            </div>

            {/* Botón para enviar el formulario */}
            <button
              type="submit"
              className="w-full h-11 bg-[#6C3AFF] hover:bg-[#6d28d9] text-white rounded-lg
                       transition-colors duration-200 flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Establecer Contraseña"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
