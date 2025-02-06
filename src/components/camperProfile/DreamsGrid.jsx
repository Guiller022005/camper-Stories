import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDreams, deleteDream } from "../../services/dreamsService";
import NoRecords from "../common/NoRecords";
import DreamsModal from "../camperProfileEdit/modals/DreamsModal";

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
    <div className="py-2.5">
      <div className="w-full">
        <div className="grid grid-cols-3 gap-8 mx-auto max-w-[1400px] md:grid-cols-2 sm:grid-cols-1">
          {/* Si es editable, muestra el botón para agregar sueños */}
          {isEditable && (
            <div className="mb-4">
              <DreamsModal onAddDream={handleAddDream} onUpdate={onUpdate} />
            </div>
          )}

          {/* Renderiza los sueños */}
          {dreams.map((dream) => (
            <div
              key={dream.id}
              className="relative overflow-hidden rounded-[15px] shadow-lg aspect-[3/4] group"
            >
              {dream.image_url && (
                <img
                  src={dream.image_url}
                  alt={dream.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[10px] transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {/* Si es editable, muestra botón de eliminación */}
              {isEditable && (
                <button
                  onClick={() => handleDeleteDream(dream.id)}
                  disabled={isLoading}
                  className="absolute z-[2] top-2.5 right-2.5 font-bold text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-300"
                >
                  x
                </button>
              )}

              <div className="absolute left-0 bottom-0 w-full h-0 z-[1] flex flex-col items-center justify-center text-center overflow-hidden rounded-[10px] bg-gradient-to-t from-[#141414c9] via-transparent to-transparent p-10 text-sm transition-[height] duration-500 group-hover:h-full">
                <h3 className="font-poppins font-bold text-[38px] text-[#fafafa] leading-[1.3] tracking-wider mt-[75%] mb-2 opacity-0 translate-y-[10px] animate-slideUp group-hover:opacity-100 group-hover:translate-y-0 md:text-[24px] md:mt-[50%] md:mb-1 sm:text-[20px] sm:mt-[40%]">
                  {dream.title}
                </h3>
                <p className="font-poppins font-normal text-[18px] text-[#f0f0f0] leading-[1.6] tracking-wide opacity-0 translate-y-[20px] animate-slideUp delay-200 group-hover:opacity-100 group-hover:translate-y-0 md:text-[14px] md:leading-[1.4] md:px-5 sm:text-[12px] sm:leading-[1.3] sm:px-3">
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
