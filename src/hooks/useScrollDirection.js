import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScroll, setLastScroll] = useState(0);
  const [isInCampersSection, setIsInCampersSection] = useState(false);

  useEffect(() => {
    const threshold = 0;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const campersSection = document.getElementById('campers');
      const campersPosition = campersSection?.offsetTop || 0;
      
      // Verificar si estamos en la sección de campers
      setIsInCampersSection(currentScroll >= campersPosition - 100); // Agregamos un offset
      
      // Determinar dirección del scroll solo si el cambio es mayor al threshold
      if (Math.abs(currentScroll - lastScroll) < threshold) {
        return;
      }
      
      if (currentScroll <= 0) {
        setScrollDirection('up');
      } else if (currentScroll > lastScroll) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll]);

  return { scrollDirection, isInCampersSection };
};

export default useScrollDirection;