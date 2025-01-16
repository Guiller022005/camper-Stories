import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";

export function ProyectsEditModal({
  project,
  technologies,
  onUpdateProject,
  onClose,
}) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    code_url: "",
    technologyIds: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        project_id: project.id,
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        code_url: project.code_url || "",
        technologyIds: project.technologyIds || [],
      });
    }
  }, [project]);

  const validateUrl = (url) => {
    if (!url) return "El link del proyecto es requerido";
    if (!url.match(/^https?:\/\//)) {
      return "El link debe comenzar con 'http://' o 'https://'";
    }
    return "";
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'code_url') {
      const error = validateUrl(value);
      setUrlError(error);
    }
    
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectTechnology = (selectedId) => {
    const techId = Number(selectedId);
    if (!isNaN(techId) && !formData.technologyIds.includes(techId)) {
      setFormData((prev) => ({
        ...prev,
        technologyIds: [...prev.technologyIds, techId],
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      } else {
        toast.error("Por favor, selecciona un archivo de imagen válido");
      }
    }
  };

  const handleRemoveTechnology = (techId) => {
    const numericId = Number(techId);
    setFormData((prev) => ({
      ...prev,
      technologyIds: prev.technologyIds.filter((id) => id !== numericId),
    }));
  };

  const getTechnologyName = (techId) => {
    const tech = technologies.find((t) => t.id === techId);
    return tech ? tech.name : `Technology ${techId}`;
  };

  const availableTechnologies = technologies.filter(
    (tech) => !formData.technologyIds.includes(tech.id)
  );

  const handleSubmit = () => {
    // Validaciones
    if (!formData.title.trim()) {
      toast.error("El título es requerido");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("La descripción es requerida");
      return;
    }
    if (!formData.code_url.trim()) {
      toast.error("El link del proyecto es requerido");
      return;
    }

    const urlError = validateUrl(formData.code_url);
    if (urlError) {
      toast.error(urlError);
      return;
    }

    if (formData.technologyIds.length === 0) {
      toast.error("Debes seleccionar al menos una tecnología");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const projectData = new FormData();
      projectData.append("project_id", formData.id);
      projectData.append("title", formData.title.trim());
      projectData.append("description", formData.description.trim());
      projectData.append("code_url", formData.code_url.trim());

      if (formData.image instanceof File) {
        projectData.append("image", formData.image);
      } else if (formData.image) {
        projectData.append("image", formData.image);
      }

      projectData.append("technologyIds", JSON.stringify(formData.technologyIds));

      onUpdateProject({
        ...formData,
        id: project.id,
      });

      toast.success("Proyecto actualizado exitosamente");
      onClose();
      localStorage.setItem("scrollPosition", window.scrollY);
      location.reload()
    } catch (error) {
      toast.error("Error al actualizar el proyecto");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
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
              placeholder="Nombre del proyecto"
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
              placeholder="Describe tu proyecto"
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code_url" className="text-right text-gray-900">
              Link del Proyecto
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="code_url"
                value={formData.code_url}
                onChange={handleChange}
                className={`text-gray-900 border-gray-300 w-full ${
                  urlError ? 'border-red-500' : ''
                }`}
                placeholder="https://github.com/tu-usuario/tu-proyecto"
              />
              {urlError && (
                <p className="text-sm text-red-500">{urlError}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              Tecnologías
            </Label>
            <Select onValueChange={handleSelectTechnology}>
              <SelectTrigger className="w-full text-gray-900 border-gray-300">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {availableTechnologies.map((tech) => (
                  <SelectItem
                    key={tech.id}
                    value={tech.id.toString()}
                    className="text-gray-900"
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
                  className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-md"
                >
                  <span className="text-sm text-gray-900">
                    {getTechnologyName(techId)}
                  </span>
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
            disabled={isSubmitting || !!urlError}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}