import React, { use, useEffect, useState } from "react";
import { dreamsData } from "../../data/data";
import { getDreams } from "../../services/dreamsService";
import styles from "./styles/DreamsGridEdit.module.css";
import DreamsModal from "./modals/DreamsModal";

const DreamsGridEdit = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fechDreams = async () => {
      try {
        const id = "1"; 
        setLoading(true);
        const dreamsData = await getDreams(id);
        setDreams(dreamsData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading dreams: ", err);
      } finally {
        setLoading(false);
      }
    };

    fechDreams();
  }, []);

  const uniqueDreams = [...new Set(dreams.map((dream) => dream.id))].map((id) =>
    dreams.find((dream) => dream.id === id)
  );

  const handleAddDream = (newDream) => {
    setDreams((prevDreams) => [...prevDreams, newDream]);
  };

  return (
    <div className={styles.cardArea}>
      <div className={styles.wrapper}>
        <div className={styles.boxArea}>
          <div className={styles.openDreamsModal}>
            <DreamsModal onAddDream={handleAddDream} />
          </div>
          {uniqueDreams.map((box) => (
            <div key={box.id} className={styles.box}>
              <img src={box.image} alt={box.title} />
              <div className={styles.overlay}>
                <h3>{box.title}</h3>
                <p>{box.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamsGridEdit;
