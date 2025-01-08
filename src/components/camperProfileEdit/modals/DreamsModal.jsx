import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AddItemButton from '../ui/AddItemButton';

const DreamsModal = ({ onAddDream }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDream = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.imagePreview,
    };
    onAddDream(newDream);
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddItemButton 
          type="dream"
          className="rounded-2xl bg-transparent backdrop-blur-none"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Añadir Nuevo Sueño</DialogTitle>
          <DialogDescription>
            Completa los detalles de tu nuevo sueño aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de título */}
          <div className="space-y-2">
            <Label className="text-gray-900" htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingresa el título de tu sueño"
              required
            />
          </div>

          {/* Campo de descripción */}
          <div className="space-y-2">
            <Label className="text-gray-900" htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe tu sueño"
              required
            />
          </div>

          {/* Campo de imagen */}
          <div className="space-y-2">
            <Label className="text-gray-900" htmlFor="image">Imagen</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer text-gray-600   "
            />
            {formData.imagePreview && (
              <div className="mt-2">
                <img
                  src={formData.imagePreview}
                  alt="Vista previa"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Botón para guardar */}
          <Button type="submit" className="w-full">
            Guardar Sueño
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DreamsModal;
