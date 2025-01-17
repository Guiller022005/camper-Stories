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
import { toast } from 'react-toastify';
import { addTikTok } from '@/services/tiktokService';

const TikTokAddModal = ({ onAddTiktok, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
  });
  const [isLoading, setIsLoading] = useState(false);
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

    if (!formData.video_url.trim()) {
      newErrors.video_url = 'La URL es requerida';
    } else if (!validateTikTokUrl(formData.video_url)) {
      newErrors.video_url = 'Por favor, ingresa una URL válida de TikTok';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const camper_id = localStorage.getItem('camper_id');
        const tiktokData = {
          title: formData.title.trim(),
          video_url: formData.video_url.trim(),
          platform: "TikTok"
        };

        const response = await addTikTok(tiktokData, camper_id);

        if (response) {
          toast.success('¡TikTok agregado exitosamente!');
          onAddTiktok(response);
          window.location.reload();
          setFormData({ title: '', video_url: '' });
          onClose();
        }
      } catch (error) {
        toast.error('Error al agregar el TikTok. Verifica tus credenciales y la URL.');
        console.error('Error adding TikTok:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-blue-100">
          Añadir TikTok
        </DialogTitle>
        <DialogDescription className="text-blue-300">
          Agrega un nuevo TikTok a tu proceso de formación. Asegúrate de usar enlaces válidos de TikTok.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 py-4 px-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-blue-300">
            Título del video
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder="Ej: Mi experiencia en Campuslands"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm font-medium text-blue-300">
            URL del TikTok
          </Label>
          <Input
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            className={`bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all ${
              errors.url ? 'border-red-500' : ''
            }`}
            placeholder="https://www.tiktok.com/@usuario/video/..."
          />
          {errors.video_url && (
            <p className="text-sm text-red-500">{errors.video_url}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-blue-300">
            Descripción (opcional)
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            placeholder="Breve descripción del contenido"
          />
        </div>

        <DialogFooter className="flex gap-2 pt-4 border-t border-blue-500/30">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-blue-600 hover:bg-blue-900/30 hover:text-blue-200 transition-all border-blue-500/30"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            {isLoading ? 'Añadiendo...' : 'Añadir TikTok'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

};

export default TikTokAddModal;