import React from 'react';
import { PlusCircle } from 'lucide-react';

const AddItemButton = ({ 
  type = 'default',
  onClick,
  className = '',
  containerStyles = {} 
}) => {
  // Configuraciones predefinidas para diferentes tipos de tarjetas
  const typeStyles = {
    tiktok: {
        width: '325px',
        height: '605px',
        minWidth: '325px',
        borderRadius: '15px',
        '@media (max-width: 768px)': {
            width: '100%',
            minWidth: '280px',
            maxWidth: '325px'
        }
    },
    project: {
      width: '100%',
      height: '450px',
      minWidth: '300px',
      borderRadius: '12px',
    },
    dream: {
      width: '100%',
      aspectRatio: '1/1',
      minWidth: '250px',
      borderRadius: '8px',
    },
    default: {
      width: '100%',
      height: '400px',
      minWidth: '300px',
      borderRadius: '12px',
    }
  };
  
  // Estilos base que se aplicarán a todos los botones
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#030337',
    border: '2px dashed rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ...typeStyles[type],
    ...containerStyles
  };

  // Clases base para el contenedor
  const baseClasses = `
    hover:border-blue-500/50 
    hover:bg-opacity-80 
    group 
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      style={baseStyles}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <PlusCircle 
        className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" 
      />
    </div>
  );
};

export default AddItemButton;