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
import { useState, useEffect } from "react";
import AddItemButton from "../ui/AddItemButton";

export function ProyectsModal({ onAddProject, technologies }) {
  // Añadimos validación inicial para technologies
  const techArray = Array.isArray(technologies) ? technologies : [];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    code_url: "", // Changed from codeUrl to code_url to match API
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

  const handleSubmit = () => {
    // Validate required fields using the correct field name
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.code_url.trim()
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Create FormData object
    const projectData = new FormData();

    // Append all fields in the correct format
    projectData.append("camper_id", 58);
    projectData.append("title", formData.title.trim());
    projectData.append("description", formData.description.trim());
    projectData.append("code_url", formData.code_url.trim());

    // Handle image if it exists
    if (formData.image instanceof File) {
      projectData.append("image", formData.image, formData.image.name);
    }

    // Append technology IDs in the format the API expects
    projectData.append("technologyIds", JSON.stringify(formData.technologyIds));

    // Log the FormData contents for debugging
    console.log(formData);
    console.log(projectData);
    // Send the FormData object instead of the formData state
    onAddProject(projectData);

    // Reset form with the correct field names
    setFormData({
      title: "",
      description: "",
      image: null,
      code_url: "", // Match the field name we're using
      technologyIds: [],
    });
  };

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
              id="code_url"
              value={formData.code_url}
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
