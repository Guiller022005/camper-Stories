import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import campushm from "/src/assets/Campushm.png";
import { toast } from "react-toastify";
import { endpoints } from "../../services/apiConfig";

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Expresión regular para validar contraseñas seguras
  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    // Validar que existe un token
    if (!token) {
      toast.error("Token no válido");
      navigate("/campers/login");
    }
  }, [token, navigate]);

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
      const response = await fetch(endpoints.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          token: token,
          newPassword: password
        }),
      });

      if (response.ok) {
        toast.success("¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.");
        navigate("/campers/login");
      } else {
        const responseData = await response.json();
        toast.error(responseData.message || "Error al actualizar la contraseña. Intenta nuevamente.");
      }
    } catch (err) {
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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full h-11 pl-3 pr-10 bg-[#3a3a4e] rounded-lg text-white text-sm
                           focus:ring-2 focus:ring-[#7c3aed] border-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-opacity-100"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {/* Campo para confirmar la contraseña */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-white text-sm">Confirmar Contraseña</Label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full h-11 pl-3 pr-10 bg-[#3a3a4e] rounded-lg text-white text-sm
                           focus:ring-2 focus:ring-[#7c3aed] border-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-opacity-100"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
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
