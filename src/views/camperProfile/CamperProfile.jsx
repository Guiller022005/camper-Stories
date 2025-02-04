import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import styles from "./styles/CamperProfile.module.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "@/components/common/Loader";
import LazySection from "@/components/common/LazySection";
import FloatingActionMenu from "@/components/FloatingMenu/FloatingActionMenu";
import { fetchCamperById } from "@/services/camperService";
import { fetchTikToksByCamperId } from "@/services/tiktokService";
import { fetchMeritsByCamperId } from "@/services/meritsService";
import { DEFAULT_CAMPER_DATA } from "@/data/dataDefault";
import { toast } from "react-toastify";

// Lazy load components
const NavbarProfile = lazy(() => import("../../components/navbar/NavbarProfile"));
const ProfileHeader = lazy(() => import("../../components/camperProfile/ProfileHeader"));
const ProfileHeaderEdit = lazy(() => import("../../components/camperProfileEdit/ProfileHeaderEdit"));
const AboutMe = lazy(() => import("../../components/camperProfile/AboutMe"));
const AboutMeEdit = lazy(() => import("../../components/camperProfileEdit/AboutMeEdit"));
const Dreams = lazy(() => import("../../components/camperProfile/Dreams"));
const TrainingProcess = lazy(() => import("../../components/camperProfile/TrainingProcess"));
const TrainingProcessEdit = lazy(() => import("../../components/camperProfileEdit/TrainingProcessEdit"));
const Proyects = lazy(() => import("../../components/camperProfile/Proyects"));
const ProyectsEdit = lazy(() => import("../../components/camperProfileEdit/ProyectsEdit"));
const SponsorCTA = lazy(() => import("../../components/camperProfile/SponsorCTA"));
const Footer = lazy(() => import("../../components/footer/Footer"));

const CamperProfile = ({ isEditable }) => { // Propiedad de Edicion
    const { id } = useParams();
    const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
    const [camperTiktoksData, setCamperTiktoksData] = useState([]);
    const [camperMerits, setCamperMerits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener `camper_id` y `role` desde localStorage
    const camperIdFromStorage = parseInt(localStorage.getItem("camper_id"));
    const roleFromStorage = localStorage.getItem("role");

    // Si el usuario intenta editar un perfil que no le pertenece, lo redirige
    if (isEditable && roleFromStorage === "camper" && parseInt(id) !== camperIdFromStorage) {
        toast.error("No tienes permiso para acceder a esta página.");
        return <Navigate to={`/campers/profile/${camperIdFromStorage}/edit`} replace />;
    }

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
                if (scrollPosition) {
                    window.scrollTo(0, parseInt(scrollPosition));
                    localStorage.removeItem("scrollPosition");
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

    if (isLoading) return <Loader />;
    if (error) {
        return <ErrorPage title="Error al cargar el perfil" message={`No pudimos cargar la información del camper. ${error}`} error="404" />;
    }

    return (
        <div className={styles.camperProfileView}>
            <LazySection>
                <NavbarProfile />
            </LazySection>
            <div className={styles.profileMainContent}>
                <LazySection>
                    {isEditable ? (
                        <ProfileHeaderEdit data={camperData} initialMerits={camperMerits} onUpdate={refreshData} />
                    ) : (
                        <ProfileHeader data={camperData} initialMerits={camperMerits} />
                    )}
                </LazySection>

                <LazySection>
                    <div id="sobre-mi">
                        {isEditable ? (
                            <AboutMeEdit videoUrl={camperData.main_video_url} about={camperData.about} onUpdate={refreshData} />
                        ) : (
                            <AboutMe videoUrl={camperData.main_video_url} about={camperData.about} />
                        )}
                    </div>
                </LazySection>

                <LazySection>
                    <div id="sueños-grid">
                        <Dreams isEditable={isEditable} onUpdate={refreshData} />
                    </div>
                </LazySection>

                <LazySection>
                    <div id="proceso-formacion">
                        {isEditable ? <TrainingProcessEdit videos={camperTiktoksData} onUpdate={refreshData} /> : <TrainingProcess videos={camperTiktoksData} />}
                    </div>
                </LazySection>

                <LazySection>
                    <div id="projects">
                        {isEditable ? <ProyectsEdit onUpdate={refreshData} /> : <Proyects />}
                    </div>
                </LazySection>
                
                <LazySection>
                    <div id="patrocinar">
                        <SponsorCTA />
                    </div>
                </LazySection>
            </div>

            <LazySection>
                <Footer />
            </LazySection>

            {isEditable && (
                <Suspense fallback={null}>
                    <FloatingActionMenu />
                </Suspense>
            )}
        </div>
    );
};

export default CamperProfile;

