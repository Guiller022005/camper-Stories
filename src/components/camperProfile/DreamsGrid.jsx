import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDreams } from "../../services/dreamsService";
import styles from "./styles/DreamsGrid.module.css";
import NoRecords from "../common/NoRecords";

const DreamsGrid = () => {
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

  if (isLoading) {
    return null; // O podrías retornar un componente de loading si lo prefieres
  }

  if (!dreams || dreams.length === 0) {
    return <NoRecords title="" showTitle={false} />;
  }

  return (
    <div className={styles.cardArea}>
      <div className={styles.wrapper}>
        <div className={styles.boxArea}>
          {dreams.map((dream) => (
            <div key={dream.id} className={styles.box}>
              <img src={dream.image_url} alt={dream.title} loading="lazy" />
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

export default DreamsGrid;
