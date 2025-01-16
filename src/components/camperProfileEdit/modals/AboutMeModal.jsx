import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import { editCamperInfo, fetchCamperById } from "@/services/camperService";
import camper from "@/data/camperProfilePage";

const AboutMeModal = ({ initialData, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    about: initialData?.about || "",
    main_video_url: initialData?.main_video_url || "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const navbar = document.querySelector(".navbar-profile");
    if (navbar) {
      navbar.classList.toggle("navbar-hidden", isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCurrentImage = async () => {
      try {
        const camperData = await fetchCamperById(id);
        console.log("Data recibida", camperData);
        setCurrentImage(camperData.profile_picture);
      } catch (error) {
        console.error("Error obteniendo imagen actual:", error);
      }
    };

    if (isOpen) {
      fetchCurrentImage();
    }
  }, [isOpen, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();

      userData.append("about", formData.about.trim());
      userData.append("main_video_url", formData.main_video_url.trim());

      if (currentImage && typeof currentImage === 'string') {
        try {
            const response = await fetch(currentImage);
            if (response.ok) {
                const blob = await response.blob();
                userData.append("profile_picture", blob, 'current_profile_picture.jpg');
            }
        } catch (error) {
            console.error("Error al procesar la imagen actual:", error);
        }
    }

      console.log("data a enviar a service", userData);

      const response = await editCamperInfo(id, userData);

      if (response) {
        onUpdate();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghostNoHover" size="icon">
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto z-[9999] bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Editar Sobre Mí</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Sobre Mí
            </label>
            <Textarea
              name="about"
              className="text-gray-900 bg-gray-50 min-h-[150px]"
              value={formData.about}
              onChange={handleChange}
              placeholder="Cuéntanos sobre ti..."
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              URL del Video
            </label>
            <Input
              name="main_video_url"
              className="text-gray-900 bg-gray-50"
              value={formData.main_video_url}
              onChange={handleChange}
              placeholder="URL del video de presentación"
              type="url"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AboutMeModal;
