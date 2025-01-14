import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getDreams } from "../../services/dreamsService";
import styles from "./styles/DreamsGridEdit.module.css";
import DreamsModal from "./modals/DreamsModal";

const DreamsGridEdit = () => {
  const [dreams, setDreams] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchDreams = async () => {
      try {
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