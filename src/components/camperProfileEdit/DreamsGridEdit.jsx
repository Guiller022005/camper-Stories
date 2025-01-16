import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDreams, deleteDream } from "../../services/dreamsService";
import styles from "./styles/DreamsGridEdit.module.css";
import DreamsModal from "./modals/DreamsModal";

const DreamsGridEdit = ({ onUpdate }) => {
  const [dreams, setDreams] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const { id } = useParams();

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        setIsLoading(true); // Activar loading
        const dreamsData = await getDreams(id);
        const uniqueDreams = [
          ...new Set(dreamsData.map((dream) => dream.id)),
        ].map((id) => dreamsData.find((dream) => dream.id === id));
        console.log(uniqueDreams);
        setDreams(uniqueDreams);
      } catch (err) {
        console.error("Error loading dreams: ", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchDreams();
  }, [id]); 

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
    <div className={styles.cardArea}>
      <div className={styles.wrapper}>
        <div className={styles.boxArea}>
          <div className={styles.openDreamsModal}>
            <DreamsModal onAddDream={handleAddDream} onUpdate={onUpdate} />
          </div>
          {dreams && dreams.map((dream) => (
            <div key={dream.id} className={styles.box}>
              {dream.image_url && (
                <img 
                  src={dream.image_url} 
                  alt={dream.title} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                  }} 
                />
              )}
              <button
                onClick={() => handleDeleteDream(dream.id)}
                disabled={isLoading}
                className={styles.deleteButton}
              >
                x
              </button>
              <div className={styles.overlay}>
                <h3>{dream.title}</h3>
                <p>{dream.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamsGridEdit;