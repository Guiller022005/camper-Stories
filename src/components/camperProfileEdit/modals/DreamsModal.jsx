import React, { useState } from "react";
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
import AddItemButton from "../ui/AddItemButton";
import { addDreams } from "../../../services/dreamsService";
import { useParams } from "react-router-dom";

const DreamsModal = ({ onAddDream, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: null,
    imagePreview: null,
  });
  const { id } = useParams();

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
          image_url: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDream = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
      camper_id: id,
    };
    onAddDream(newDream);
    try {
      console.log(newDream);
      const response = await addDreams(id, newDream);
      console.log("respuesta del servidor", response);
      onUpdate();
    } catch (error) {
      console.error("No fue posible enviar la informacion", error);
      throw error;
    }
    setFormData({
      title: "",
      description: "",
      image_url: null,
      imagePreview: null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AddItemButton
          type="dream"
          className="rounded-2xl bg-blue-950/50 hover:bg-blue-900/30 border border-blue-500/30 text-blue-200 transition-colors"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-100">
            Añadir Nuevo Sueño
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Completa los detalles de tu nuevo sueño aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Campo de título */}
          <div className="space-y-2">
            <Label className="text-blue-300" htmlFor="title">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingresa el título de tu sueño"
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            />
          </div>

          {/* Campo de descripción */}
          <div className="space-y-2">
            <Label className="text-blue-300" htmlFor="description">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe tu sueño"
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            />
          </div>

          {/* Campo de imagen */}
          <div className="space-y-2">
            <Label className="text-blue-300" htmlFor="image">
              Imagen
            </Label>
            <Input
              id="image"
              name="image_url"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer bg-blue-950/50 border-blue-500/30 text-blue-200 hover:bg-blue-900/30 transition-colors file:bg-blue-950/50 file:align-top file:text-blue-100 file:border-0 file:rounded-lg file:px-4 file:py-0.5 file:mr-10 file:hover:bg-yellow-500 file:hover:text-black file:transition-colors file:duration-500"
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
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            Guardar Sueño
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DreamsModal;
