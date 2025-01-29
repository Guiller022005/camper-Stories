import React from 'react';
import Campers from "../../components/campersMainPage/Campers"; // Asegúrate de que la ruta sea correcta

const CamperCardWrapper = ({ camperData, additionalProp }) => {
    // Aquí puedes agregar cualquier lógica o condiciones adicionales
    const shouldDisplay = camperData.isActive; // Ejemplo de condición

    return (
        <>
            {shouldDisplay ? (
                <Campers
                    {...camperData}
                    additionalProp={additionalProp}
                />
            ) : (
                <div>No hay campers disponibles.</div> // Mensaje de prueba
            )}
        </>
    );
};

export default CamperCardWrapper; 