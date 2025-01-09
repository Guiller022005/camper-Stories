import React, { useState } from 'react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TikTokAddModal = ({ onAddTiktok, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  }); 

  const [errors, setErrors] = useState({});

  const validateTikTokUrl = (url) => {
    // Regex básico para URLs de TikTok
    const tiktokPattern = /^https?:\/\/((?:vm|vt|www)\.)?tiktok\.com\/.+/i;
    return tiktokPattern.test(url);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'La URL es requerida';
    } else if (!validateTikTokUrl(formData.url)) {
      newErrors.url = 'Por favor, ingresa una URL válida de TikTok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddTiktok(formData);
      setFormData({ title: '', url: '', description: '' });
      onClose();
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">
          Añadir TikTok
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Agrega un nuevo TikTok a tu proceso de formación. Asegúrate de usar enlaces válidos de TikTok.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-900">
            Título del video
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`text-gray-900 border-gray-300 ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Ej: Mi experiencia en Campuslands"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm font-medium text-gray-900">
            URL del TikTok
          </Label>
          <Input
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className={`text-gray-900 border-gray-300 ${errors.url ? 'border-red-500' : ''}`}
            placeholder="https://www.tiktok.com/@usuario/video/..."
          />
          {errors.url && (
            <p className="text-sm text-red-500">{errors.url}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-900">
            Descripción (opcional)
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-gray-900 border-gray-300"
            placeholder="Breve descripción del contenido"
          />
        </div>

        <DialogFooter className="flex gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Añadir TikTok
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default TikTokAddModal;