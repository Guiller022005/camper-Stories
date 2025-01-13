import React, { useEffect, useState, lazy } from "react";
import styles from "./styles/CamperProfileEdit.module.css";
import NavbarProfile from "../../components/navbar/NavbarProfile";
import camper from "../../data/camperProfilePage";
import Footer from "../../components/footer/Footer";
import { fetchCamperById } from "@/services/camperService";
import LazySection from "@/components/common/LazySection";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";
import { fetchTikToksByCamperId } from "@/services/tiktokService";
import { fetchMeritsByCamperId } from "@/services/meritsService";

// Lazy load components
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
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>
          Error: {error}
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.camperProfileView}>
      <NavbarProfile />
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
            camperInfoInitialData={camper}
          />
        </LazySection>

        <LazySection>
          <DreamsEdit />
        </LazySection>

        <LazySection>
          <TrainingProcessEdit videos={camperData.processTikToks} />
        </LazySection>

        <LazySection>
          <ProyectsEdit />
        </LazySection>

        <LazySection>
          <SponsorCTAEdit />
        </LazySection>
      </div>
      <Footer />
    </div>
  );
};

export default CamperProfileEdit;
