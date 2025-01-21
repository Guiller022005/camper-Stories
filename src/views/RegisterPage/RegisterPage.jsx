import { useState, useEffect } from "react";
import {
  Loader2,
  User,
  Mail,
  Lock,
  MapPin,
  FileText,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { endpoints } from "../../services/apiConfig";
import campushm from "/src/assets/Campushm.png";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ciudadesColombia, setCiudadesColombia] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });
  const [searchCity, setSearchCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);


  const tiposDocumento = [
    { id: '1', nombre: 'Cédula de Ciudadanía' },
    { id: '2', nombre: 'Cédula de Extranjería' },
    { id: '3', nombre: 'Tarjeta de Identidad' },
    { id: '4', nombre: 'Pasaporte' }
  ];

  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Descompone caracteres acentuados en su forma base
      .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (tildes)
      .toLowerCase(); // Convierte a minúsculas
  };

  const filterCities = (query) => {
    if (!query) {
      setFilteredCities([]);
      return;
    }
  
    const normalizedQuery = normalizeString(query);
    const words = normalizedQuery.split(" "); // Divide la consulta en palabras normalizadas
  
    const filtered = ciudadesColombia.filter((ciudad) => {
      const normalizedCityName = normalizeString(ciudad.city);
  
      // Verifica que todas las palabras de la consulta estén presentes en el nombre de la ciudad
      return words.every((word) => normalizedCityName.includes(word));
    });
  
    setFilteredCities(filtered.slice(0, 5)); // Limitar a 5 resultados
  };  

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(endpoints.city);
        const text = await response.text(); // Obtener la respuesta como texto
        console.log("Respuesta de la API:", text); // Para depuración
  
        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const data = JSON.parse(text); // Convertir a JSON
          console.log("Ciudades obtenidas:", data);
          setCiudadesColombia(data.data); // Accediendo a la propiedad 'data'
          setFilteredCities(data.data); // Inicializa las ciudades filtradas
        } else {
          console.error(
            "Error: La respuesta no es un JSON válido o hubo un problema con la solicitud."
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
  
    fetchCities();
  }, []);
  

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['first_name', 'last_name'].includes(name) ? capitalizeWords(value) : value
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(event.target);
    // const documentType = formData.get('document_type');
    // const documentNumber = formData.get('documento');

    // Verificar si el documento está en la whitelist
    // if (!isDocumentAllowed(documentType, documentNumber)) {
    //   setError("Lo sentimos, este documento no está autorizado para registrarse.");
    //   toast.error("Lo sentimos, este documento no está autorizado para registrarse.");
    //   setIsLoading(false);
    //   return;
    // }

    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      document_type: formData.get('document_type'),
      document_number: formData.get('documento'),
      birth_date: formData.get('edad'),
      city: formData.get('ciudad')
    };

    console.log(data)

    try {
      const response = await fetch(endpoints.register, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('¡Registro exitoso!');  
        navigate('/campers/login');
    } else {
        const errorMessage = responseData.error || responseData.message || "Error al registrarse. Intenta nuevamente.";
        setError(errorMessage);
        toast.error(errorMessage);
    }
    } catch (err) {
      const errorMessage = "Error de red: No se pudo conectar con el servidor.";
      setError(errorMessage);
      toast.error(errorMessage);
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

        <div className="w-full bg-[#2a2a3e] p-4 lg:p-8 border border-[#6b5ffd] rounded-2xl 
                      shadow-[0_0_30px_-6px_#6b5ffd] relative z-10">
          {/* Logo y Título */}
          <div className="text-center mb-5 space-y-2">
            <div className="flex justify-center">
              <div className="w-24 lg:w-32">
                <img src={campushm} alt="Campus" className="w-full h-auto mx-auto" />
              </div>
            </div>
            <h1 className="text-xl text-white font-bold">Camper Stories</h1>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Grid para Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="first_name" className="text-white text-sm">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="first_name"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                             focus:ring-2 focus:ring-[#7c3aed] border-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last_name" className="text-white text-sm">Apellido</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="last_name"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                             focus:ring-2 focus:ring-[#7c3aed] border-none"
                  />
                </div>
              </div>
            </div>

            {/* Grid para Tipo y Número de Documento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="document_type" className="text-white text-sm">Tipo de Documento</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    id="document_type"
                    name="document_type"
                    required
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-gray-400 text-sm
                             focus:ring-2 focus:ring-[#7c3aed] border-none appearance-none"
                  >
                    <option value="">Selecciona tipo</option>
                    {tiposDocumento.map((tipo) => (
                      <option key={tipo.id} value={tipo.id} className="text-white">{tipo.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="documento" className="text-white text-sm">Documento</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="documento"
                    name="documento"
                    required
                    placeholder="Número de documento"
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                             focus:ring-2 focus:ring-[#7c3aed] border-none"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white text-sm">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@ejemplo.com"
                  className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                           focus:ring-2 focus:ring-[#7c3aed] border-none"
                />
              </div>
            </div>

            {/* Grid para Contraseñas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-white text-sm">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className={`w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                   focus:ring-2 focus:ring-[#7c3aed] border-none
                   ${passwordError ? 'ring-2 ring-red-500' : ''}`} // Añadido feedback visual
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(''); // Limpiar error al cambiar
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm_password" className="text-white text-sm">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className={`w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                   focus:ring-2 focus:ring-[#7c3aed] border-none
                   ${passwordError ? 'ring-2 ring-red-500' : ''}`} // Añadido feedback visual
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError(''); // Limpiar error al cambiar
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mostrar el error de contraseña si existe */}
            {passwordError && (
              <p className="text-red-500 text-xs text-center">
                {passwordError}
              </p>
            )}

            <p className="text-xs text-gray-400 text-center">
              La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
            </p>

            {/* Grid para Fecha y Ciudad */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edad" className="text-white text-sm">Fecha de Nacimiento</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="edad"
                    name="edad"
                    type="date"
                    required
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                             focus:ring-2 focus:ring-[#7c3aed] border-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ciudad" className="text-white text-sm">Ciudad</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="ciudad"
                    name="ciudad"
                    type="text"
                    placeholder="Busca tu ciudad"
                    value={searchCity}
                    onFocus={() => setShowDropdown(true)} // Mostrar desplegable al hacer clic
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Ocultar desplegable con retraso para permitir selección
                    onChange={(e) => {
                      setSearchCity(e.target.value);
                      filterCities(e.target.value);
                    }}
                    className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm
                            focus:ring-2 focus:ring-[#7c3aed] border-none"
                  />
                </div>
                {/* Mostrar resultados solo si `showDropdown` es true */}
                {showDropdown && filteredCities.length > 0 ? (
                  <ul
                    className="absolute bg-[#3a3a4e] mt-1 rounded-lg shadow-lg max-h-40 overflow-auto z-50 hide-scrollbar"
                    style={{ maxHeight: "calc(2.5rem * 5)" }} // Altura dinámica para 5 elementos
                  >
                    {filteredCities.map((ciudad) => (
                      <li
                        key={ciudad.id}
                        className="px-4 py-2 text-white hover:bg-[#6d28d9] cursor-pointer"
                        onClick={() => {
                          setSearchCity(ciudad.city); // Actualizar el campo con la ciudad seleccionada
                          setFormData((prev) => ({ ...prev, ciudad: ciudad.id })); // Guardar la ciudad seleccionada
                          setFilteredCities([]); // Limpiar resultados
                          setShowDropdown(false); // Cerrar desplegable
                        }}
                      >
                        {ciudad.city}
                      </li>
                    ))}
                  </ul>
                ) : showDropdown && searchCity && (
                  <p className="text-gray-400 text-sm mt-1">No hay resultados</p>
                )}
              </div>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full h-11 bg-[#6C3AFF] hover:bg-[#6d28d9] text-white rounded-lg
                       transition-colors duration-200 flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Registrarse"
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
