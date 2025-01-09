import { useState } from 'react';
import { Loader2, User, Mail, Lock, MapPin, FileText, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { endpoints } from '@/services/apiConfig'; // Importar los endpoints

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Captura los valores del formulario
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get('first_name'),       // Campo esperado por el backend
      last_name: formData.get('last_name'),         // Campo esperado por el backend
      email: formData.get('email'),                 // Campo esperado por el backend
      password: formData.get('password'),           // Campo esperado por el backend
      role: 'camper',                               // Asignar siempre el rol 'camper'
      document_number: formData.get('documento'),   // Campo que será usado para CAMPER
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
    <div className="min-h-screen flex items-center justify-center bg-[#1a1b26] p-4">
      <Card className="w-full max-w-lg border-0 bg-[#1f2937]/50 shadow-2xl shadow-purple-500/10">
        <CardHeader className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-24 h-24">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" />
                <path
                  d="M50 20C35 20 25 35 25 50C25 65 35 80 50 80C65 80 75 65 75 50C75 35 65 20 50 20Z"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
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
                <Label htmlFor="first_name" className="text-white">Nombre</Label>
                <Input id="first_name" name="first_name" required placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-white">Apellido</Label>
                <Input id="last_name" name="last_name" required placeholder="Tu apellido" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento" className="text-white">Número de documento</Label>
              <Input id="documento" name="documento" required placeholder="Tu número de documento" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Correo electrónico</Label>
              <Input id="email" name="email" type="email" required placeholder="tu@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Contraseña</Label>
              <Input id="password" name="password" type="password" required placeholder="••••••••" />
              <p className="text-xs text-gray-400">
                La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edad" className="text-white">Edad</Label>
                <Input id="edad" name="edad" type="number" required placeholder="Tu edad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad" className="text-white">Ciudad</Label>
                <Input id="ciudad" name="ciudad" required placeholder="Tu ciudad" />
              </div>
            </div>
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert variant="success"><AlertDescription>Registro exitoso.</AlertDescription></Alert>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 animate-spin" /> : 'Registrarse'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
