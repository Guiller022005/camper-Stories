import React, { useEffect, useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Edit } from 'lucide-react';

const ProfileHeaderModal = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    city: initialData?.city || '',
    age: initialData?.age || '',
    profilePicture: null
  });

  const cities = [
    { label: "Bucaramanga", value: "Bucaramanga" },
    { label: "Bogotá", value: "Bogota" },
    { label: "Medellín", value: "Medellin" },
    { label: "Cali", value: "Cali" }
  ];
  
  useEffect(() => {
    const navbar = document.querySelector('.navbar-profile');
    if (navbar) {
      navbar.classList.toggle('navbar-hidden', isOpen);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profilePicture: file,
        imageUrl: imageUrl
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto z-[9999] bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Editar Perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 ">Foto de Perfil</label>
            <Input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <Input
              name="nombre"
              className="text-gray-900 bg-gray-50"
              value={formData.nombre}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 35) { // Ajusta el número 20 al límite que desees
                  handleChange(e);
                }
              }}
              maxLength={35} // Añade esta prop para limitar también desde HTML
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Ciudad</label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData(prev => ({...prev, city: value}))}
            >
              <SelectTrigger className="w-full text-gray-900 bg-gray-50">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999]">
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Edad</label>
            <Input
              type="number"
              name="age"
              className="text-gray-900 bg-gray-50"
              value={formData.age}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                  handleChange(e);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                  e.preventDefault();
                }
              }}
              placeholder="Tu edad"
              min="1"
              max="99"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogTrigger>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileHeaderModal;