import React, { useState } from 'react';
import { dreamsData } from '../../data/data';
import styles from './styles/DreamsGridEdit.module.css';
import DreamsModal from './modals/DreamsModal';

const DreamsGridEdit = () => {
  const [dreams, setDreams] = useState(dreamsData.dreams);

  const uniqueDreams = [...new Set(dreams.map(dream => dream.id))].map(id => 
    dreams.find(dream => dream.id === id)
  );

  const handleAddDream = (newDream) => {
    setDreams(prevDreams => [...prevDreams, newDream]);
  };
  
  return (
    <div className={styles.cardArea}>
      <div className={styles.wrapper}>
        <div className={styles.boxArea}>
          <div className={styles.openDreamsModal}>
            <DreamsModal onAddDream={handleAddDream} />
          </div>
          {uniqueDreams.map(box => (
            <div key={box.id} className={styles.box}>
              <img 
                src={box.image} 
                alt={box.title} 
              />
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