import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "boxicons";
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import AddItemButton from "../ui/AddItemButton";

export function ProyectsModal({ onAddProject, technologies }) {
  // Añadimos validación inicial para technologies
  const [isOpen, setIsOpen] = useState(false);
  const techArray = Array.isArray(technologies) ? technologies : [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    code_url: "",
    technologyIds: [],
  });

  // Función auxiliar para verificar si un valor es un ID válido
  const isValidId = (id) => typeof id === "number" && !isNaN(id);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSelectTechnology = (techId) => {
    console.log("Seleccionado techId (raw):", techId); // Verifica el valor original
    const numericId = Number(techId);

    if (!isValidId(numericId)) {
      console.error("El ID seleccionado no es válido:", techId);
      return;
    }

    setFormData((prev) => {
      const alreadySelected = prev.technologyIds.includes(numericId);
      console.log("Ya seleccionado:", alreadySelected);

      return {
        ...prev,
        technologyIds: alreadySelected
          ? prev.technologyIds
          : [...prev.technologyIds, numericId],
      };
    });
  };

  const handleRemoveTechnology = (techId) => {
    const numericId = Number(techId);
    if (!isValidId(numericId)) return;

    setFormData((prev) => ({
      ...prev,
      technologyIds: prev.technologyIds.filter((id) => id !== numericId),
    }));
  };

  const getTechnologyName = (techId) => {
    const technology = techArray.find((tech) => tech.id === techId);
    return technology?.name || "Unknown Technology";
  };

  const handleSubmit = async () => {
    // Validate required fields using the correct field name
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.code_url.trim()
    ) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      // Create FormData object
      const projectData = new FormData();
      const camper_id = localStorage.getItem('camper_id');

      projectData.append("camper_id", camper_id);
      projectData.append("title", formData.title.trim());
      projectData.append("description", formData.description.trim());
      projectData.append("code_url", formData.code_url.trim());

      if (formData.image instanceof File) {
        projectData.append("image", formData.image, formData.image.name);
      }

      projectData.append("technologyIds", JSON.stringify(formData.technologyIds));

      // Call the onAddProject function and await its response
      await onAddProject(projectData);

      // Show success toast
      toast.success("¡Proyecto agregado exitosamente!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: null,
        code_url: "",
        technologyIds: [],
      });

      // Cerrar el modal
      setIsOpen(false);

    } catch (error) {
      // Show error toast if something goes wrong
      toast.error('Error al guardar el proyecto. Por favor intenta de nuevo.');
      console.error('Error saving project:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full">
          <AddItemButton
            type="project"
            className="w-full h-full bg-blue-950/30 hover:bg-blue-900/30 border-blue-500/30 text-blue-200 transition-all"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-100">
            Añadir Proyecto
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Añade tus proyectos aquí y presiona guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-blue-300">
              Título
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3 bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-blue-300">
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3 bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right text-blue-300">
              Imagen
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="col-span-3 bg-blue-950/50 border-blue-500/30 text-blue-200 cursor-pointer file:bg-blue-950/50 file:text-blue-100 file:border-0 file:rounded-lg file:px-4 file:py-0.5 file:hover:bg-yellow-500 file:hover:text-black file:transition-colors"
            />
          </div>
          {formData.imagePreview && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="col-span-4 mt-2">
                <img
                  src={formData.imagePreview}
                  alt="Vista previa"
                  className="w-full h-32 object-cover rounded"
                />
              </Label>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codeUrl" className="text-right text-blue-300">
              Link del Proyecto
            </Label>
            <Input
              id="code_url"
              value={formData.code_url}
              onChange={handleChange}
              className="col-span-3 bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-300">
              Tecnologías
            </label>
            <Select onValueChange={(value) => handleSelectTechnology(value)}>
              <SelectTrigger className="w-full bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:ring-yellow-400/20 hover:bg-blue-900/30 transition-all">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-200">
                {techArray.map((tech) => (
                  <SelectItem
                    key={tech.id}
                    value={tech.id.toString()}
                    className="hover:bg-blue-800/30 focus:bg-blue-800/50 cursor-pointer text-blue-200"
                  >
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ul className="mt-2 space-y-1">
              {formData.technologyIds.map((techId) => (
                <li
                  key={techId}
                  className="flex justify-between items-center px-3 py-1 bg-blue-950/50 border border-blue-500/30 text-blue-200 rounded-md"
                >
                  <span className="text-sm">{getTechnologyName(techId)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(techId)}
                    className="text-red-500 hover:text-red-700 ml-2 font-medium"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="border-t border-blue-500/30 pt-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}
