import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ProyectsEditModal({
  project,
  technologies,
  onUpdateProject,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    code_url: project?.code_url || "",
    technologies: project?.technologies || []
  });

  useEffect(() => {
    setFormData({
      title: project?.title || "",
      description: project?.description || "",
      image: project?.image || "",
      code_url: project?.code_url || "",
      technologies: project?.technologies || []
    });
  }, [project]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      !formData.code_url
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedProject = {
      ...formData,
      image: formData.image, // Envía el archivo al backend
    };

    onUpdateProject(updatedProject);
    onClose(); // Cerrar el modal
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Editar Proyecto
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Modifica los detalles de tu proyecto aquí.
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right text-gray-900">
              URL Imagen
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codeUrl" className="text-right text-gray-900">
              Link del Proyecto
            </Label>
            <Input
              id="codeUrl"
              value={formData.code_url}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Tecnologías
            </label>
            <Select onValueChange={handleSelectTechnology}>
              <SelectTrigger className="w-full text-gray-900 border-gray-300">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {technologies.map((tech) => (
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
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="border-t pt-4 space-x-2">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="text-gray-700 hover:text-gray-900 border-gray-300"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
