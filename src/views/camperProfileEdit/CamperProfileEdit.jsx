import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import styles from "./styles/CamperProfileEdit.module.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "@/components/common/Loader";
import LazySection from "@/components/common/LazySection";
import { fetchCamperById } from "@/services/camperService";
import { fetchTikToksByCamperId } from "@/services/tiktokService";
import { fetchMeritsByCamperId } from "@/services/meritsService";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";
import { toast } from "react-toastify";

// Lazy load components
import Navbar from "../../components/navbar/Navbar";
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
const Footer = lazy(() => import("../../components/footer/Footer"));

const navigateToSection = (sectionId) => {
  const basePath = isEditPage
    ? `/campers/profile/${id}/edit`
    : `/campers/profile/${id}`;

  navigate(basePath);

  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);
};

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
    toast.error("No tienes permiso para acceder a esta página.");
    return <Navigate to={`/campers/profile/${camperIdFromStorage}/edit`} replace />;
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

        const scrollPosition = localStorage.getItem("scrollPosition");
        console.log("info_inicial", data_infoCamper);

        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          localStorage.removeItem("scrollPosition"); // Limpia después de usar
        }
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

  const refreshData = async () => {
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
      console.error("Error recargando datos:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Navbar
            viewType="profile"
            links={[
                { id: "sobre-mi", label: "Sobre mí" },
                { id: "proceso-formacion", label: "Proceso" },
                { id: "sueños-grid", label: "Sueños" },
                { id: "projects", label: "Proyectos" }
            ]}
            onLinkClick={navigateToSection}
        />
      </LazySection>
      <div className={styles.profileMainContent}>
        <LazySection>
          <ProfileHeaderEdit
            data={camperData}
            initialMerits={camperMerits}
            onUpdate={refreshData}
          />
        </LazySection>

        <LazySection>
          <div id="sobre-mi">
            <AboutMeEdit
              videoUrl={camperData.main_video_url}
              about={camperData.about}
              camperInfoInitialData={camperData}
              onUpdate={refreshData}
            />
          </div>
        </LazySection>

        <LazySection>
          <div id="sueños-grid">
            <DreamsEdit onUpdate={refreshData} />
          </div>
        </LazySection>

        <LazySection>
          <div id="proceso-formacion">
            <TrainingProcessEdit
              videos={camperTiktoksData}
              onUpdate={refreshData}
            />
          </div>
        </LazySection>

        <LazySection>
          <div id="projects">
            <ProyectsEdit onUpdate={refreshData} />
          </div>
        </LazySection>
      </div>
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

export default CamperProfileEdit;
