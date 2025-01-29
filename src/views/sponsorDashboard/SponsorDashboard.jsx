import React, { lazy, Suspense, useState, useEffect } from 'react';
import Campers from "../../components/campersMainPage/Campers";
import { fetchCamperById } from '../../services/camperService';  // Asegúrate de tener la ruta correcta

const NavbarProfile = lazy(() => import("../../components/navbar/Navbar"));
const Footer = lazy(() => import('../../components/footer/Footer'));
const AboutMe = lazy(() => import('../../components/camperProfile/AboutMe'));

const SponsorDashboard = () => {
  const [camperData, setCamperData] = useState({
    main_video_url: '',
    about: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Aquí debes especificar el ID del camper que quieres mostrar
        const data = await fetchCamperById(1); // Por ejemplo, camper con ID 1
        setCamperData(data);
      } catch (error) {
        console.error("Error loading camper data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="sponsorDashboardView flex flex-col relative">
      <NavbarProfile />
      <div className="mainContent flex flex-col gap-4">
        <AboutMe 
          videoUrl={camperData.main_video_url}
          about={camperData.about}
        />
        <Campers />
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SponsorDashboard;