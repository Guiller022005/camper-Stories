import React, { useEffect, useState, lazy } from "react";
import styles from "./styles/CamperProfileEdit.module.css";
import NavbarProfile from "../../components/navbar/NavbarProfile";
import camper from "../../data/camperProfilePage";
import Footer from "../../components/footer/Footer";
import { fetchCamperById } from "@/services/camperService";
import LazySection from "@/components/common/LazySection";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener informacion del camper por id
  useEffect(() => {
    const loadCamper = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCamperById(58);
        console.log("Data recibida:", data); // Veamos qué datos recibimos
        setCamperData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error cargando datos del camper:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCamper();
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
            initialMerits={camperData.merits}
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
          <TrainingProcessEdit videos={camper.processTikToks} />
        </LazySection>

        <LazySection>
          <ProyectsEdit projects={camper.projects} />
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
