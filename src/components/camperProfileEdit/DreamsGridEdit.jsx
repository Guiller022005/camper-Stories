import React, { useEffect, useState } from "react";
import { getDreams } from "../../services/dreamsService";
import styles from "./styles/DreamsGridEdit.module.css";
import DreamsModal from "./modals/DreamsModal";

const DreamsGridEdit = () => {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const id = 58; 
        setLoading(true);
        const dreamsData = await getDreams(id);
        const uniqueDreams = [...new Set(dreamsData.map(dream => dream.id))]
          .map(id => dreamsData.find(dream => dream.id === id));
        console.log(uniqueDreams);
        setDreams(uniqueDreams);
      } catch (err) {
        console.error("Error loading dreams: ", err);
      } finally {
      }
    };

    fetchDreams();
  }, []);

  const uniqueDreams = [...new Set(dreams.map((dream) => dream.id))].map((id) =>
    dreams.find((dream) => dream.id === id)
  );

  const handleAddDream = (newDream) => {
    setDreams((prevDreams) => [...prevDreams, newDream]);
  };

  if (loading) return <p>Loading dreams...</p>;
  if (error) return <p>Error loading dreams: {error}</p>;

  return (
    <div className={styles.cardArea}>
      <div className={styles.wrapper}>
        <div className={styles.boxArea}>
          <div className={styles.openDreamsModal}>
            <DreamsModal onAddDream={handleAddDream} />
          </div>
          {dreams.map(dream => (
            <div key={dream.id} className={styles.box}>
              <img 
                src={dream.image} 
                alt={dream.title}
                loading="lazy"
              />
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
