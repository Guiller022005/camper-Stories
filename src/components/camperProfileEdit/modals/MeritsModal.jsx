import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import {
  fetchMeritsByCamperId,
  updateCamperMerits,
  getMerits,
} from "../../../services/meritsService";
import { useParams, Navigate } from "react-router-dom";

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
      // Fetch available merits
      const merits = await getMerits();
      setAvailableMerits(merits);

      setSelectedMerits(initialMerits);
      const camperMerits = await fetchMeritsByCamperId(id);
      setSelectedMerits(camperMerits);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAddMerit = (value) => {
    const meritToAdd = availableMerits.find((merit) => merit.name === value);
    if (meritToAdd && !selectedMerits.some((m) => m.id === meritToAdd.id)) {
      setSelectedMerits([...selectedMerits, meritToAdd]);
    }
  };

  const handleRemoveMerit = (meritId) => {
    setSelectedMerits(selectedMerits.filter((merit) => merit.id !== meritId));
  };

  const handleSubmit = async () => {
    try {
      // Extract only the IDs from the selected merits
      const meritIds = selectedMerits.map((merit) => merit.id);

      // Call the updateCamperMerits service with the correct payload
      await updateCamperMerits(id, meritIds);
      console.log("Méritos guardados:", meritIds);
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
          <DialogTitle className="text-xl font-bold ">
            Editar Méritos
          </DialogTitle>
          <DialogDescription className="text-blue-300">
            Selecciona los méritos que has obtenido durante tu formación.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <label className="text-sm font-medium text-blue-300">
              Añadir Méritos
            </label>
            <Select onValueChange={handleAddMerit}>
              <SelectTrigger className="w-full bg-blue-950/50 border-blue-500/30 text-blue-200 focus:ring-yellow-400/20 hover:bg-blue-900/30 transition-all">
                <SelectValue placeholder="Selecciona un mérito" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0f2a]/95 border border-blue-500/30 backdrop-blur-lg text-blue-200 z-[9999]">
                {availableMerits.map((merit) => (
                  <SelectItem
                    key={merit.id}
                    value={merit.name}
                    disabled={selectedMerits.some((m) => m.id === merit.id)}
                    className="hover:bg-blue-800/30 focus:bg-blue-800/50 cursor-pointer text-blue-200 disabled:text-blue-400/50"
                  >
                    {merit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-4">
              <label className="text-sm font-medium text-blue-300">
                Méritos Seleccionados
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedMerits.map((merit) => (
                  <Badge
                    key={merit.id}
                    variant="secondary"
                    className="px-3 py-1 text-sm flex items-center gap-2 bg-blue-950/50 text-blue-200 border border-blue-500/30 hover:bg-blue-900/30 transition-all"
                  >
                    {merit.name}
                    <button
                      onClick={() => handleRemoveMerit(merit.id)}
                      className="text-xs hover:text-yellow-400 transition-colors"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {selectedMerits.length === 0 && (
                  <p className="text-sm text-blue-400/50 italic">
                    No hay méritos seleccionados
                  </p>
                )}
              </div>
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
