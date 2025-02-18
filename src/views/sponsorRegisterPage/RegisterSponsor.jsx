import { useState, useEffect } from "react";
import {
 Loader2,
 User,
 Mail,
 Lock,
 MapPin,
 FileText,
 Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { endpoints } from "../../services/apiConfig";
import { toast } from "react-toastify";

export default function RegisterForm() {
 const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(false);
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [ciudadesColombia, setCiudadesColombia] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [formData, setFormData] = useState({
   first_name: '',
   last_name: '',
   ciudad: ''
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
     .normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .toLowerCase();
 };

 const filterCities = (query) => {
   if (!query) {
     setFilteredCities([]);
     return;
   }
   const normalizedQuery = normalizeString(query);
   const words = normalizedQuery.split(" ");
   const filtered = ciudadesColombia.filter((ciudad) => {
     const normalizedCityName = normalizeString(ciudad.city);
     return words.every((word) => normalizedCityName.includes(word));
   });
   setFilteredCities(filtered.slice(0, 5));
 };

 useEffect(() => {
   fetch(endpoints.city)
     .then(res => res.json())
     .then(data => setCiudadesColombia(data.data))
     .catch(err => console.error(err));
 }, []);

 const handleSubmit = async (event) => {
   event.preventDefault();
   if (password !== confirmPassword) {
     setPasswordError("Las contraseñas no coinciden");
     return;
   }

   setIsLoading(true);

   const formDataObj = new FormData(event.target);
   
   // Validar fecha de nacimiento
   const birthDate = formDataObj.get('edad');
   const today = new Date();
   const birthDateObj = new Date(birthDate);
   const age = today.getFullYear() - birthDateObj.getFullYear();
   
   if (age < 18) {
     toast.error("Debes ser mayor de edad para registrarte como sponsor");
     setIsLoading(false);
     return;
   }

   // Validar que la ciudad exista en la lista de ciudades
   const ciudadSeleccionada = ciudadesColombia.find(
     ciudad => ciudad.id === formData.ciudad
   );

   if (!ciudadSeleccionada) {
     toast.error("Por favor selecciona una ciudad de la lista");
     setIsLoading(false);
     return;
   }

   const data = {
     first_name: formDataObj.get('first_name').trim(),
     last_name: formDataObj.get('last_name').trim(),
     email: formDataObj.get('email').trim().toLowerCase(),
     password: formDataObj.get('password'),
     document_type_id: parseInt(formDataObj.get('document_type')),
     document_number: formDataObj.get('documento').trim(),
     city_id: parseInt(formData.ciudad),
     birth_date: formDataObj.get('edad'),
     role_id: 2, // Role ID para sponsors
     image_url: null // Valor inicial para la imagen
   };

   try {
     const response = await fetch(endpoints.sponsorsRegister, {
       method: 'POST',
       headers: { 
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify(data)
     });

     const result = await response.json();

     if (response.ok) {
       toast.success('¡Registro exitoso! Por favor inicia sesión para continuar con tu suscripción.');
       // Redirigir al login después de un breve delay
       setTimeout(() => {
         navigate('/login/sponsor');
       }, 2000);
     } else {
       throw new Error(result.message || "Error en el registro");
     }
   } catch (error) {
     console.error('Error en el registro:', error);
     toast.error(error.message || "Error al crear la cuenta. Por favor intenta nuevamente.");
   } finally {
     setIsLoading(false);
   }
 };

 // Agregar validación de contraseña mientras el usuario escribe
 const validatePassword = (pass) => {
   const minLength = 8;
   const hasUpperCase = /[A-Z]/.test(pass);
   const hasLowerCase = /[a-z]/.test(pass);
   const hasNumbers = /\d/.test(pass);
   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

   if (pass.length < minLength) {
     return "La contraseña debe tener al menos 8 caracteres";
   }
   if (!hasUpperCase || !hasLowerCase) {
     return "La contraseña debe incluir mayúsculas y minúsculas";
   }
   if (!hasNumbers) {
     return "La contraseña debe incluir al menos un número";
   }
   if (!hasSpecialChar) {
     return "La contraseña debe incluir al menos un carácter especial";
   }
   return "";
 };

 const handlePasswordChange = (e) => {
   const newPassword = e.target.value;
   setPassword(newPassword);
   const error = validatePassword(newPassword);
   setPasswordError(error);
 };

 // Validaciones adicionales que podrías agregar al handleSubmit
 const validateForm = (data) => {
   if (data.document_number.length < 5) {
     throw new Error("El número de documento no es válido");
   }
   
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
     throw new Error("El correo electrónico no es válido");
   }

   if (data.first_name.length < 2 || data.last_name.length < 2) {
     throw new Error("El nombre y apellido deben tener al menos 2 caracteres");
   }

   return true;
 };

 return (
   <div className="min-h-screen w-full bg-[#1a1a2e] flex items-center justify-center p-6">
     <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative">
       <div className="absolute inset-0 bg-gradient-to-r from-[#6b5ffd20] via-[#6b5ffd40] to-[#6b5ffd20] rounded-2xl blur-md"></div>

       <div className="w-full bg-[#2a2a3e] p-4 lg:p-8 border border-[#6b5ffd] rounded-2xl shadow-[0_0_30px_-6px_#6b5ffd] relative z-10">
         <h1 className="text-xl text-white font-bold text-center mb-6">Registro de Sponsor</h1>

         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <Label htmlFor="first_name" className="text-white text-sm">Nombre</Label>
               <div className="relative">
                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                 <input
                   id="first_name"
                   name="first_name"
                   required
                   placeholder="Tu nombre"
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
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
                   placeholder="Tu apellido"
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
                 />
               </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <Label htmlFor="document_type" className="text-white text-sm">Tipo de Documento</Label>
               <div className="relative">
                 <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                 <select
                   id="document_type"
                   name="document_type"
                   required
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-gray-400 text-sm focus:ring-2 focus:ring-[#7c3aed] appearance-none"
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
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
                 />
               </div>
             </div>
           </div>

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
                 className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
               />
             </div>
           </div>

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
                   className={`w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed] ${
                     passwordError ? 'ring-2 ring-red-500' : ''
                   }`}
                   value={password}
                   onChange={handlePasswordChange}
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
                   className={`w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed] ${passwordError ? 'ring-2 ring-red-500' : ''}`}
                   value={confirmPassword}
                   onChange={(e) => {
                     setConfirmPassword(e.target.value);
                     setPasswordError('');
                   }}
                 />
               </div>
             </div>
           </div>

           {passwordError && (
             <p className="text-red-500 text-xs text-center">{passwordError}</p>
           )}

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
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
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
                   onFocus={() => setShowDropdown(true)}
                   onBlur={() => {
                     setTimeout(() => {
                       setShowDropdown(false);
                       // Validar si la ciudad escrita existe en la lista
                       const ciudadExiste = ciudadesColombia.find(
                         ciudad => normalizeString(ciudad.city) === normalizeString(searchCity)
                       );
                       if (!ciudadExiste && searchCity) {
                         toast.warning("Por favor selecciona una ciudad válida de la lista");
                         setSearchCity("");
                         setFormData(prev => ({ ...prev, ciudad: "" }));
                       }
                     }, 200);
                   }}
                   onChange={(e) => {
                     setSearchCity(e.target.value);
                     filterCities(e.target.value);
                   }}
                   className="w-full h-11 pl-9 pr-3 bg-[#3a3a4e] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#7c3aed]"
                 />
               </div>
               {showDropdown && filteredCities.length > 0 && (
                 <ul className="absolute bg-[#3a3a4e] mt-1 rounded-lg shadow-lg max-h-40 overflow-auto z-50">
                   {filteredCities.map((ciudad) => (
                     <li
                       key={ciudad.id}
                       className="px-4 py-2 text-white hover:bg-[#6d28d9] cursor-pointer"
                       onClick={() => {
                         setSearchCity(ciudad.city);
                         setFormData(prev => ({
                           ...prev,
                           ciudad: ciudad.id
                         }));
                         setFilteredCities([]);
                         setShowDropdown(false);
                       }}
                     >
                       {ciudad.city}
                     </li>
                   ))}
                 </ul>
               )}
             </div>
           </div>

           <button
             type="submit"
             className="w-full h-11 bg-[#6C3AFF] hover:bg-[#6d28d9] text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
             disabled={isLoading}
           >
             {isLoading ? (
               <Loader2 className="animate-spin" size={20} />
             ) : (
               "Registrarse"
             )}
           </button>

           <div className="text-center">
             <button
               type="button"
               onClick={() => navigate("/login/sponsor")}
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