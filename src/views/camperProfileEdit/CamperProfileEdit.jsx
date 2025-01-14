import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Navigate } from "react-router-dom";
import styles from "./styles/CamperProfileEdit.module.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "@/components/common/Loader";
import LazySection from "@/components/common/LazySection";
import FloatingActionMenu from '@/components/FloatingMenu/FloatingActionMenu';
import { fetchCamperById } from "@/services/camperService";
import { fetchTikToksByCamperId } from "@/services/tiktokService";
import { fetchMeritsByCamperId } from "@/services/meritsService";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";

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
  const { id } = useParams(); // Obtén el ID desde la URL
  const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
  const [camperTiktoksData, setCamperTiktoksData] = useState([]);
  const [camperMerits, setCamperMerits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener `camper_id` y `role` desde localStorage
  const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));
  const roleFromStorage = localStorage.getItem("role");

  // Validar acceso al perfil
  if (roleFromStorage === "camper" && parseInt(id) !== camperIdFromStorage) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Fetch camper, tiktoks, and merits based on camper ID
  useEffect(() => {
    const loadCamperData = async () => {
      try {
        setIsLoading(true);
        const [data_infoCamper, data_tiktoks, data_merits] = await Promise.all([
          fetchCamperById(id),
          fetchTikToksByCamperId(id),
          fetchMeritsByCamperId(id),
        ]);

        setCamperData(data_infoCamper);
        setCamperTiktoksData(Array.isArray(data_tiktoks) ? data_tiktoks : []);
        setCamperMerits(Array.isArray(data_merits) ? data_merits : []);
      } catch (err) {
        setError(err.message);
        console.error("Error cargando datos:", err);
        setCamperData(DEFAULT_CAMPER_DATA);
        setCamperTiktoksData([]);
        setCamperMerits([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCamperData();
    }
  }, [id]);

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
          <ProfileHeaderEdit data={camperData} initialMerits={camperMerits} />
        </LazySection>

        <LazySection>
          <div id="sobre-mi-edit">
            <AboutMeEdit
              videoUrl={camperData.main_video_url}
              about={camperData.about}
            />
          </div>
        </LazySection>

        <LazySection>
          <div id="sueños-grid-edit">
            <DreamsEdit />
          </div>
        </LazySection>

        <LazySection>
          <div id="proceso-formacion-edit">
            <TrainingProcessEdit videos={camperTiktoksData} />
          </div>
        </LazySection>

        <LazySection>
          <div id="projects-edit">
            <ProyectsEdit />
          </div>
        </LazySection>

        <LazySection>
          <div id="patrocinar-edit">
            <SponsorCTAEdit />
          </div>
        </LazySection>
      </div>
      <LazySection>
        <Footer />
      </LazySection>

      <Suspense fallback={null}>
        <FloatingActionMenu />
      </Suspense>
    </div>
  );
};

export default CamperProfileEdit;
