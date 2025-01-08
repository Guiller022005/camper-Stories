import React from 'react';
import { dreamsData } from '../../data/data';
import styles from './styles/DreamsGrid.module.css'

const DreamsGrid = () => {

  const uniqueDreams = [...new Set(dreamsData.dreams.map(dream => dream.id))].map(id => 
    dreamsData.dreams.find(dream => dream.id === id)
  );
  
  return (
    <div className={styles.cardArea}>
     <div className={styles.wrapper}>
       <div className={styles.boxArea}>
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
 
 export default DreamsGrid;