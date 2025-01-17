import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import {
  fetchMeritsByCamperId,
  updateCamperMerits,
  getMerits,
} from "../../../services/meritsService";
import { useParams } from "react-router-dom";

const MeritsModal = ({ initialMerits }) => {
  const [selectedMerits, setSelectedMerits] = useState([]);
  const [availableMerits, setAvailableMerits] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      const merits = await getMerits();
      setAvailableMerits(merits);
      setSelectedMerits(initialMerits);
      const camperMerits = await fetchMeritsByCamperId(id);
      setSelectedMerits(camperMerits);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleMeritToggle = (merit) => {
    setSelectedMerits((prev) => {
      const isAlreadySelected = prev.some((m) => m.id === merit.id);
      if (isAlreadySelected) {
        return prev.filter((m) => m.id !== merit.id);
      } else {
        return [...prev, merit];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const meritIds = selectedMerits.map((merit) => merit.id);
      await updateCamperMerits(id, meritIds);
      window.location.reload();
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving merits:", error);
      alert("Hubo un problema al guardar los méritos.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghostNoHover" size="icon">
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-100 shadow-2xl shadow-blue-500/20 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Editar Méritos
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Selecciona los méritos que has obtenido durante tu formación.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-blue-300">
              Seleccionar Méritos
            </label>
            <div className="flex flex-wrap gap-2">
              {availableMerits.map((merit) => {
                const isSelected = selectedMerits.some(
                  (m) => m.id === merit.id
                );
                // return (
                //   <button
                //     key={merit.id}
                //     onClick={() => handleMeritToggle(merit)}
                //     className={`
                //       relative flex items-center px-4 py-2 text-sm font-medium rounded-lg
                //       transition-colors duration-150
                //       ${
                //         isSelected
                //           ? "bg-blue-600 text-blue-200 border-yellow-400 border"
                //           : "bg-blue-950/50 text-blue-200 border-blue-500/30 hover:bg-blue-900/30"
                //       }
                //     `}
                //     aria-label={merit.description}
                //   >
                //     {merit.name}
                //   </button>
                // );
                return (
                  <div className="relative group">
                    <button
                      key={merit.id}
                      onClick={() => handleMeritToggle(merit)}
                      className={`
                        relative flex items-center px-4 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-150
                        ${
                          isSelected
                            ? "bg-gray-900 text-blue-200 border-yellow-400 border"
                            : "bg-blue-950/50 text-blue-200 border-blue-400/30 hover:bg-gray-900/30"
                        }
                      `}
                    >
                      {merit.name + " "}
                      {merit.icon}
                    </button>
                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2
                      bg-gray-900 text-white text-sm rounded-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 z-50 text-center border 
                      border-transparent group-hover:border-yellow-400 shadow-lg pointer-events-none
                      w-48 min-h-[2rem] max-w-xs break-words"
                    >
                      {merit.description}
                      {/* Flecha del tooltip */}
                      <div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-t-gray-900"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between border-t border-blue-500/30 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="text-blue-600 hover:bg-blue-900/30 hover:text-blue-200 transition-all border-blue-500/30"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeritsModal;
