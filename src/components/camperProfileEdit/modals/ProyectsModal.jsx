import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import 'boxicons'
import "./styles/Proyects.Modal.css"
import { useState } from "react"
import { time } from "framer-motion"

// async function saveToDatabase(data) {
//     const response = await fetch("/api/saveProject", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error("Error guardando en la base de datos");
//     }
//   }


export function ProyectsModal({ onAddProject, technologuies }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    codeUrl: "",
    technologies: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // const handleSubmit = async = () => {
  //     try {
  //         setFormData()
  //     } catch(error){

  //     }
  // }

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
    if (!formData.title || !formData.description || !formData.image || !formData.codeUrl) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onAddProject(formData);

    // Limpiar el formulario
    setFormData({
      title: "",
      description: "",
      image: "",
      codeUrl: "",
      technologies: [],
    });

  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="addButton">
          <box-icon name='plus-circle' color='#fdfcfc' size="80px"></box-icon></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Añadir Proyectos</DialogTitle>
          <DialogDescription className="text-gray-600">
            Añade tus proyectos aqui, presiona guardar cuando hayas acabado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-900">
              Titulo
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-gray-900">
              Descripcion
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-900">
              URL imagen
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-900">
              Link del proyecto
            </Label>
            <Input
              id="codeUrl"
              value={formData.codeUrl}
              onChange={handleChange}
              className="col-span-3 text-gray-900 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Tecnologías</label>
            <Select
              onValueChange={(value) => handleSelectTechnology(value)} // Manejar selección
            >
              <SelectTrigger className="w-full text-gray-900 border-gray-300">
                <SelectValue placeholder="Selecciona tecnologías" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {technologuies.map((tech) => (
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
                <li key={tech} className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-md">
                  <span className="text-sm text-gray-900">{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-red-500 hover:text-red-700 ml-2 font-medium"
                  >
                    &times;
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
  )
}
