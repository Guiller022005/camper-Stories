import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '../../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../../ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

const MeritsModal = ({ initialMerits }) => {
  const [selectedMerits, setSelectedMerits] = useState(initialMerits || []);
  const [isOpen, setIsOpen] = useState(false);

  // Lista de méritos disponibles
  const availableMerits = [
    { id: 1, name: "Espíritu Guerrero ⚔️" },
    { id: 2, name: "Nuevos horizontes 🌅" },
    { id: 3, name: "Trota mundos 🌎" },
    { id: 4, name: "Primer programador 💻" },
    { id: 5, name: "Trabajo en equipo 🤝" },
    { id: 6, name: "Innovador 💡" },
    { id: 7, name: "Líder nato 👑" },
    { id: 8, name: "Mentor destacado 🎯" }
  ];

  const handleAddMerit = (value) => {
    const meritToAdd = availableMerits.find(merit => merit.name === value);
    if (meritToAdd && !selectedMerits.some(m => m.id === meritToAdd.id)) {
      setSelectedMerits([...selectedMerits, meritToAdd]);
    }
  };

  const handleRemoveMerit = (meritId) => {
    setSelectedMerits(selectedMerits.filter(merit => merit.id !== meritId));
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar los méritos
    console.log('Méritos guardados:', selectedMerits);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Editar Méritos
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Selecciona los méritos que has obtenido durante tu formación.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-900">Añadir Méritos</label>
            <Select onValueChange={handleAddMerit}>
              <SelectTrigger className="w-full text-gray-900 border-gray-300">
                <SelectValue placeholder="Selecciona un mérito" />
              </SelectTrigger>
              <SelectContent>
                {availableMerits.map((merit) => (
                  <SelectItem
                    key={merit.id}
                    value={merit.name}
                    disabled={selectedMerits.some(m => m.id === merit.id)}
                  >
                    {merit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-900">Méritos Seleccionados</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedMerits.map((merit) => (
                  <Badge
                    key={merit.id}
                    variant="secondary"
                    className="px-3 py-1 text-sm flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
                  >
                    {merit.name}
                    <button
                      onClick={() => handleRemoveMerit(merit.id)}
                      className="text-xs hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {selectedMerits.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No hay méritos seleccionados
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-gray-900"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MeritsModal