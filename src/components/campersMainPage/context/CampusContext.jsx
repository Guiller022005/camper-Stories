import React, { createContext, useContext, useState } from 'react';

const CampusContext = createContext();

export const useCampus = () => useContext(CampusContext);

export const CampusProvider = ({ children }) => {
    const [currentCampusId, setCurrentCampusId] = useState(1);

    const updateCampus = (campusId) => setCurrentCampusId(campusId);

    return (
        <CampusContext.Provider value={{ currentCampusId, updateCampus }}>
            {children}
        </CampusContext.Provider>
    );
};
