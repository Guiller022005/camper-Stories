import React, { useEffect, useState, lazy } from "react";
import styles from "./styles/CamperProfileEdit.module.css";
import LazySection from "@/components/common/LazySection";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";

import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "@/components/common/Loader";


import { fetchCamperById } from "@/services/camperService";
import { fetchTikToksByCamperId } from "@/services/tiktokService";
import { fetchMeritsByCamperId } from "@/services/meritsService";

// Lazy load components
const NavbarProfile = lazy(() => import("@/components/navbar/NavbarProfile"))
const ProfileHeaderEdit = lazy(() =>
  import("../../components/camperProfileEdit/ProfileHeaderEdit")
);
const AboutMeEdit = lazy(() =>
  import("../../components/camperProfileEdit/AboutMeEdit")
);
const DreamsEdit = lazy(() =>
  import("../../components/camperProfileEdit/DreamsEdit")
);
const TrainingProcessEdit = lazy(() =>
  import("../../components/camperProfileEdit/TrainingProcessEdit")
);
const ProyectsEdit = lazy(() =>
  import("../../components/camperProfileEdit/ProyectsEdit")
);
const SponsorCTAEdit = lazy(() =>
  import("@/components/camperProfileEdit/SponsorCTAEdit")
);
const Footer = lazy(() => import("../../components/footer/Footer"))

const CamperProfileEdit = () => {
  const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
  const [camperTiktoksData, setCamperTiktoksData] = useState([]);
  const [camperMerits, setCamperMerits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campers, tiktoks, merits by camper_id
  useEffect(() => {
    const loadCamperData = async () => {
      try {
        setIsLoading(true);
        const [data_infoCamper, data_tiktoks, data_merits] = await Promise.all([
          fetchCamperById(52),
          fetchTikToksByCamperId(1),
          fetchMeritsByCamperId(57)
        ]);

        setCamperData(data_infoCamper);
        setCamperTiktoksData(Array.isArray(data_tiktoks) ? data_tiktoks : []);
        setCamperMerits(Array.isArray(data_merits) ? data_merits : []);
      } catch (err) {
        setError(err.message);
        console.error('Error cargando datos:', err);
        // Establecer datos por defecto en caso de error
        setCamperData(DEFAULT_CAMPER_DATA);
        setCamperTiktoksData([]);
        setCamperMerits([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCamperData();
  }, []);

  if (isLoading) {
    return <Loader />; 
}

if (error) {
  return (
      <ErrorPage 
          title="Error al cargar el perfil"
          message={`No pudimos cargar la información del camper. ${error}`}
          error="404" // O podrías usar un código de error específico según el tipo de error
      />
  );
}

  return (
    <div className={styles.camperProfileView}>
      <LazySection>
        <NavbarProfile />
      </LazySection>
      <div className={styles.profileMainContent}>
        <LazySection>
          <ProfileHeaderEdit
            data={camperData}
            initialMerits={camperMerits}
          />
        </LazySection>

        <LazySection>
          <AboutMeEdit
            videoUrl={camperData.main_video_url}
            about={camperData.about}
            camperInfoInitialData={camperData}
          />
        </LazySection>

        <LazySection>
          <DreamsEdit />
        </LazySection>

        <LazySection>
          <TrainingProcessEdit
            videos={camperTiktoksData}
          />
        </LazySection>

        <LazySection>
          <ProyectsEdit />
        </LazySection>

        <LazySection>
          <SponsorCTAEdit />
        </LazySection>
      </div>
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

export default CamperProfileEdit;
