import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDreams, deleteDream } from "../../services/dreamsService";
import NoRecords from "../common/NoRecords";
import DreamsModal from "./modals/DreamsModal";

const DreamsGrid = ({ onUpdate, isEditable }) => {
  const [dreams, setDreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        setIsLoading(true);
        const dreamsData = await getDreams(id);
        const uniqueDreams = [
          ...new Set(dreamsData.map((dream) => dream.id)),
        ].map((id) => dreamsData.find((dream) => dream.id === id));
        setDreams(uniqueDreams);
      } catch (err) {
        console.error("Error loading dreams: ", err);
        setDreams([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDreams();
    }
  }, [id]);

  if (isLoading) return null; // O podrías retornar un componente de loading si lo prefieres


  if (!dreams || dreams.length === 0 && !isEditable) return <NoRecords title="" showTitle={false} />;


  const handleDeleteDream = async (dreamId) => {
    try {
      setIsLoading(true);
      await deleteDream(id, dreamId);

      setDreams((prevDreams) =>
        prevDreams.filter((dream) => dream.id !== dreamId)
      );

      onUpdate();
    } catch (error) {
      console.error("Error deleting dream:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDream = (newDream) => {
    setDreams((prevDreams) => [...prevDreams, newDream]);
  };

  return (
    <div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Si es editable, muestra el botón para agregar sueños */}
          {isEditable && (
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[3/4] group">
              <DreamsModal onAddDream={handleAddDream} onUpdate={onUpdate} />
            </div>
          )}

          {/* Renderiza los sueños */}
          {dreams.map((dream) => (
            <div
              key={dream.id}
              className="relative overflow-hidden rounded-lg shadow-md aspect-[3/4] group"
            >
              {dream.image_url && (
                <img
                  src={dream.image_url || "/placeholder.svg"}
                  alt={dream.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {/* Si es editable, muestra botón de eliminación */}
              {isEditable && (
                <button
                  onClick={() => handleDeleteDream(dream.id)}
                  disabled={isLoading}
                  className="absolute z-[2] top-2 right-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-300"
                >
                  x
                </button>
              )}

              <div className="absolute left-0 bottom-0 w-full h-0 z-[1] flex flex-col items-center justify-end text-center overflow-hidden rounded-lg bg-gradient-to-t from-[#141414c9] via-transparent to-transparent p-3 text-sm transition-[height] duration-500 group-hover:h-full">
                <h3 className="font-poppins font-bold text-lg sm:text-xl lg:text-2xl text-[#fafafa] leading-tight tracking-wide mb-1 opacity-0 translate-y-[10px] animate-slideUp group-hover:opacity-100 group-hover:translate-y-0">
                  {dream.title}
                </h3>
                <p className="font-poppins font-normal text-xs sm:text-sm lg:text-base text-[#f0f0f0] leading-snug tracking-wide opacity-0 translate-y-[20px] animate-slideUp delay-200 group-hover:opacity-100 group-hover:translate-y-0">
                  {dream.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamsGrid;
