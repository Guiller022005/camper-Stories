import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Edit } from "lucide-react";
import { endpoints } from "@/services/apiConfig";
import { useParams } from "react-router-dom";
import { editCamperInfo } from "@/services/camperService";

const ProfileHeaderModal = ({ initialData, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ciudadesColombia, setCiudadesColombia] = useState([]);
  const [formData, setFormData] = useState({
    full_name: initialData.nombre,
    city_id: "",
    profile_picture: initialData.profile_picture,
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(endpoints.city);
        const text = await response.text();
        const contentType = response.headers.get("content-type");

        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const data = JSON.parse(text);
          setCiudadesColombia(data.data);

          // Una vez que tenemos las ciudades, buscamos el ID correspondiente
          const cityFound = data.data.find(
            (city) => city.name === initialData.city
          );
          if (cityFound) {
            setFormData((prev) => ({
              ...prev,
              city_id: cityFound.id.toString(),
            }));
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchCities();
  }, [initialData.city]);

  useEffect(() => {
    const navbar = document.querySelector(".navbar-profile");
    if (navbar) {
      navbar.classList.toggle("navbar-hidden", isOpen);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profile_picture: file,
        imageUrl: imageUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("profile data", initialData);
      console.log("initial data", formData);

      const userData = new FormData();

      // Añadir los campos al FormData
      userData.append("full_name", formData.full_name);
      userData.append("city_id", formData.city_id);

      if (formData.profile_picture instanceof File) {
        userData.append("profile_picture", formData.profile_picture);
      } else if (formData.profile_picture) {
        userData.append("profile_picture", formData.profile_picture);
      }

      console.log("Ciudad camper", formData.city_id);

      const response = await editCamperInfo(id, userData);

      if (response) {
        console.log("respuesta del servidor", response);
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
          <DialogTitle className="text-gray-900">Editar Perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 ">
              Foto de Perfil
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <Input
              name="full_name"
              className="text-gray-900 bg-gray-50"
              value={formData.full_name}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 35) {
                  // Ajusta el número 20 al límite que desees
                  handleChange(e);
                }
              }}
              maxLength={35} // Añade esta prop para limitar también desde HTML
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Ciudad
            </label>
            <Select
              value={formData.city_id}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, city_id: value }))
              }
            >
              <SelectTrigger className="w-full text-gray-900 bg-gray-50">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999] text-gray-900">
                {ciudadesColombia.map((city) => (
                  <SelectItem
                    key={city.id}
                    value={city.id.toString()}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <DialogTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogTrigger>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileHeaderModal;
