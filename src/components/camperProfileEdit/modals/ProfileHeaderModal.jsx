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
import { Edit, MapPin } from "lucide-react";
import { endpoints } from "@/services/apiConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editCamperInfo, fetchCamperById } from "@/services/camperService";

const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const ProfileHeaderModal = ({ initialData, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ciudadesColombia, setCiudadesColombia] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    full_name: capitalizeWords(initialData.nombre),
    city_id: "",
    profile_picture: initialData.profile_picture,
  });

  const { id } = useParams();

  // Función de validación
  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!formData.full_name.trim()) {
      newErrors.full_name = "El nombre es requerido";
    } else if (formData.full_name.trim().length < 3) {
      newErrors.full_name = "El nombre debe tener al menos 3 caracteres";
    } else if (formData.full_name.trim().length > 35) {
      newErrors.full_name = "El nombre no puede exceder los 35 caracteres";
    }

    // Validación de la ciudad
    if (!formData.city_id) {
      newErrors.city_id = "Debes seleccionar una ciudad";
    }

    // Validación de la imagen (si se ha seleccionado una nueva)
    if (formData.profile_picture instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(formData.profile_picture.type)) {
        newErrors.profile_picture =
          "El archivo debe ser una imagen (JPEG, PNG o GIF)";
      } else if (formData.profile_picture.size > 5 * 1024 * 1024) {
        // 5MB
        newErrors.profile_picture = "La imagen no debe exceder 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

          // Verificar y asignar las ciudades
          setCiudadesColombia(data.data);

          // Buscar el ID de la ciudad seleccionada inicialmente
          const cityFound = data.data.find(
            (city) => city.city === initialData.city
          );

          if (cityFound) {
            setFormData((prev) => ({
              ...prev,
              city_id: cityFound.id.toString(), // Asegurarse de que sea un string
            }));
          }
        } else {
          console.error("La respuesta no es válida o no contiene JSON");
        }
      } catch (error) {
        console.error("Error al cargar las ciudades:", error);
      }
    };

    fetchCities();
  }, [initialData.city]);


  const normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filterCities = (query) => {
    const normalizedQuery = normalizeString(query);

    // Si no hay texto, mostrar las primeras 5 ciudades
    if (!query) {
      setFilteredCities(ciudadesColombia.slice(0, 3));
      return;
    }

    const words = normalizedQuery.split(" ");
    const filtered = ciudadesColombia.filter((ciudad) => {
      const normalizedCityName = normalizeString(ciudad.city);
      return words.every((word) => normalizedCityName.includes(word));
    });

    setFilteredCities(filtered.slice(0, 5)); // Limitar a 5 resultados
  };



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
      [name]: name === "full_name" ? capitalizeWords(value) : value,
    }));
    // Limpiar el error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar el archivo antes de establecerlo
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Por favor selecciona una imagen válida (JPEG, PNG o GIF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        toast.error("La imagen no debe exceder 5MB");
        return;
      }

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

    if (!validateForm()) {
      // Mostrar toast con el primer error encontrado
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = new FormData();
      userData.append("full_name", formData.full_name.trim());
      userData.append("city_id", formData.city_id);

      if (formData.profile_picture instanceof File) {
        userData.append("profile_picture", formData.profile_picture);
      } else if (currentImage && typeof currentImage === 'string') {
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

      console.log("parametros editcamperinfo:", id);
      for (const [key, value] of userData.entries()) {
        console.log(key, value);
      }

      const response = await editCamperInfo(id, userData);

      if (response) {
        toast.success("¡Perfil actualizado exitosamente!");
        onUpdate();
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al actualizar el perfil"
      );
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghostNoHover" size="icon" className>
          <Edit className="h-6 w-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[450px] max-h-[90vh] overflow-y-auto z-[9999] bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold ">
            Editar Perfil
          </DialogTitle>
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
              className="cursor-pointer bg-blue-950/50 border-blue-500/30 text-blue-200 hover:bg-blue-900/30 transition-colors file:bg-blue-950/50 file:align-top file:text-blue-100 file:border-0 file:rounded-lg file:px-4 file:py-0.5file:mr-10  file:hover:bg-yellow-500 file:hover:text-black file:transition-colors file:duration-500"
            />
            {errors.profile_picture && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profile_picture}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-blue-300">
              Nombre
            </label>
            <Input
              name="full_name"
              className={`text-gray-900 bg-gray-50 ${errors.full_name ? "border-red-500" : ""
                }`}
              value={formData.full_name}
              onChange={handleChange}
              maxLength={35}
              placeholder="Tu nombre"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="Busca tu ciudad"
              value={searchCity}
              onFocus={() => {
                setShowDropdown(true);
                filterCities(""); // Filtrar sin texto inicial
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onChange={(e) => {
                const capitalizedValue = capitalizeWords(e.target.value);
                setSearchCity(capitalizedValue);
                filterCities(capitalizedValue);
              }}
              className="w-full pl-[38px] bg-blue-950/50 border-blue-500/30 text-blue-200 focus:ring-yellow-400/20 hover:bg-blue-900/30 transition-all"
            />
            {showDropdown && filteredCities.length > 0 && (
              <ul
                className="absolute bg-blue-950 mt-1 rounded-lg shadow-lg max-h-40 overflow-auto z-50 hide-scrollbar"
                style={{ maxHeight: "calc(2.5rem * 5)" }}
              >
                {filteredCities.map((ciudad) => (
                  <li
                    key={ciudad.id.toString()}
                    className="px-4 py-2 text-blue-200 hover:bg-yellow-500 cursor-pointer"
                    onClick={() => {
                      setSearchCity(ciudad.city);
                      setFormData((prev) => ({ ...prev, city_id: ciudad.id.toString() }));
                      setFilteredCities([]);
                      setShowDropdown(false);
                    }}
                  >
                    {ciudad.city}
                  </li>
                ))}
              </ul>
            )}
            {showDropdown && searchCity && filteredCities.length === 0 && (
              <p className="text-yellow-400 text-sm mt-1">No hay resultados</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-blue-600 hover:bg-blue-900/30 hover:text-blue-200 transition-all border-blue-500/30"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DialogTrigger>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileHeaderModal;
