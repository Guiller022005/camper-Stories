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
import { useState } from "react";
import AddItemButton from "../ui/AddItemButton";

export function ProyectsModal({ onAddProject, technologies }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // Archivo de imagen
    imagePreview: null, // Vista previa de la imagen
    codeUrl: "",
    technologies: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file, // Guarda el archivo
          imagePreview: reader.result, // Vista previa
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSelectTechnology = (techName) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(techName)
        ? prev.technologies // Evita duplicados
        : [...prev.technologies, techName],
    }));
  };

  const handleRemoveTechnology = (techName) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== techName),
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.image ||
      !formData.codeUrl
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log(formData.image);

    // Envía los datos al componente padre
    const projectData = {
      ...formData,
      image: formData.image, // Envía la vista previa como representación de la imagen
    };

    onAddProject(projectData);

    // Limpia el formulario
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: null,
      codeUrl: "",
      technologies: [],
    });
  };

  const techArray = Array.isArray(technologies) ? technologies : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full">
          <AddItemButton
            type="project"
            className="w-full h-full bg-indigo-950/30 border-none"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Añadir Proyecto
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Añade tus proyectos aquí y presiona guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-gray-900">
              Título
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-gray-900">
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 cursor-pointer">
            <Label htmlFor="image" className="text-right text-gray-900">
              Imagen
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="col-span-3 text-gray-900 border-gray-300 cursor-pointer"
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
            <Label htmlFor="codeUrl" className="text-right text-gray-900">
              Link del Proyecto
            </Label>
            <Input
              id="codeUrl"
              value={formData.codeUrl}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Tecnologías
            </label>
            <Select onValueChange={(value) => handleSelectTechnology(value)}>
              <SelectTrigger className="w-full text-gray-900 border-gray-300">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {techArray.map((tech) => (
                  <SelectItem
                    key={tech.name}
                    value={tech.name}
                    className="text-gray-900"
                  >
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ul className="mt-2 space-y-1">
              {formData.technologies.map((tech) => (
                <li
                  key={tech}
                  className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-md"
                >
                  <span className="text-sm text-gray-900">{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-red-500 hover:text-red-700 ml-2 font-medium"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
