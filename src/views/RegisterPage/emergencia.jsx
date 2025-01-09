import { useState } from 'react';
import { Loader2, User, Mail, Lock, MapPin, FileText, Calendar } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { endpoints } from '@/services/apiConfig';
import campushm from '/src/assets/Campushm.png';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

    // Datos de ejemplo - reemplazar con datos de la API
    const tiposDocumento = [
        { id: 'CC', nombre: 'Cédula de Ciudadanía' },
        { id: 'CE', nombre: 'Cédula de Extranjería' },
        { id: 'TI', nombre: 'Tarjeta de Identidad' },
        { id: 'PP', nombre: 'Pasaporte' }
      ];
    
      const ciudadesColombia = [
        { id: 'BOG', nombre: 'Bogotá' },
        { id: 'MED', nombre: 'Medellín' },
        { id: 'CAL', nombre: 'Cali' },
        { id: 'BAR', nombre: 'Barranquilla' },
        { id: 'BUC', nombre: 'Bucaramanga' }
      ];

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'camper',
      document_type: formData.get('document_type'),
      document_number: formData.get('documento'),
      city: formData.get('ciudad')
    };

    try {
      const response = await fetch(endpoints.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(true);
        console.log('Usuario registrado con éxito:', result);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrarse. Intenta nuevamente.');
        console.error('Error del servidor:', errorData);
      }
    } catch (err) {
      setError('Hubo un error al intentar registrar al usuario. Intenta nuevamente.');
      console.error('Error de red:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-8 gap-12 font-sans">
      <div className="w-full px-80 max-w-7xl flex gap-8 items-stretch">
        <div className="flex-1 bg-[#2a2a3e] p-2 border border-[#6b5ffd] rounded-2xl shadow-[0_10px_50px_-3px_#6b5ffd] text-center">
          <CardHeader className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-40 h-auto">
                <img src={campushm} alt="Campus" className="w-40 h-auto mx-auto" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Camper Stories
            </CardTitle>
            <CardDescription className="text-gray-400 max-w-sm mx-auto">
              Cada historia tiene el poder de inspirar. Únete a Camper Stories y comparte tu historia con el mundo.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-white text-left block">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="first_name"
                    name="first_name"
                    required
                    placeholder="Tu nombre"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-white text-left block">Apellido</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="last_name"
                    name="last_name"
                    required
                    placeholder="Tu apellido"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="document_type" className="text-white text-left block">Tipo de Documento</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    id="document_type"
                    name="document_type"
                    required
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0 appearance-none"
                  >
                    <option value="" className="text-[#ffffff] bg-[#3a3a4e]">Selecciona tipo</option>
                    {tiposDocumento.map(tipo => (
                      <option key={tipo.id} value={tipo.id} className="text-white bg-[#3a3a4e]">{tipo.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documento" className="text-white text-left block">Número de documento</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="documento"
                    name="documento"
                    required
                    placeholder="Tu número de documento"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-left block">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@ejemplo.com"
                  className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-left block">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="text-white text-left block">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <p className="text-xs text-gray-400">
              La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edad" className="text-white text-left block">Edad</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="edad"
                    name="edad"
                    type="number"
                    required
                    placeholder="Tu edad"
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad" className="text-white text-left block">Ciudad</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    id="ciudad"
                    name="ciudad"
                    required
                    className="w-full py-3 px-4 pl-10 bg-[#3a3a4e] rounded-lg text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-0 appearance-none"
                  >
                    <option value="">Selecciona ciudad</option>
                    {ciudadesColombia.map(ciudad => (
                      <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert variant="success"><AlertDescription>Registro exitoso.</AlertDescription></Alert>}
            
            <Button type="submit" className="w-full bg-[#6C3AFF] hover:bg-[#6d28d9]" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 animate-spin" /> : 'Registrarse'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              className="bg-transparent border-none text-[#7c3aed] cursor-pointer text-sm hover:text-[#6d28d9]"
              onClick={() => navigate('/campers/login')}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </div>
        </CardContent>
        </div>
      </div>
    </div>
  );
}