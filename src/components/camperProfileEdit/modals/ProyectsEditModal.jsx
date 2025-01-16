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
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-100">
            Editar Proyecto
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Modifica los detalles de tu proyecto aquí.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 px-4">
          {/* Campos básicos */}
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

          <div className="grid grid-cols-4 items-center gap-4 cursor-pointer">
            <Label htmlFor="image" className="text-right text-blue-300">
              Imagen
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="col-span-3 bg-blue-950/50 border-blue-500/30 text-blue-200 file:bg-blue-950/50 file:text-blue-100 file:border-0 file:rounded-lg file:px-4 file:py-0.5 file:hover:bg-yellow-500 file:hover:text-black file:transition-colors"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code_url" className="text-right text-blue-300">
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
            <Label className="text-sm font-medium text-blue-300">
              Tecnologías
            </Label>
            <Select onValueChange={handleSelectTechnology}>
              <SelectTrigger className="w-full bg-blue-950/50 border-blue-500/30 text-blue-200 placeholder-blue-400/50 focus:ring-yellow-400/20 hover:bg-blue-900/30 transition-all">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-200">
                {availableTechnologies.map((tech) => (
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

        <DialogFooter className="border-t border-blue-500/30 pt-4 space-x-2">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="text-blue-600 hover:bg-blue-900/30 hover:text-blue-200 transition-all border-blue-500/30"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r sm-ml-2 from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}