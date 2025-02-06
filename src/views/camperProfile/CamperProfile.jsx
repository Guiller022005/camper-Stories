import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles/CamperProfile.module.css';
import LazySection from '../../components/common/LazySection';
import { DEFAULT_CAMPER_DATA } from '@/data/dataDefault';

import Loader from '@/components/common/Loader';
import { fetchCamperById } from '../../services/camperService';
import { fetchTikToksByCamperId } from '@/services/tiktokService';
import { fetchMeritsByCamperId } from '@/services/meritsService';   
import NoRecords from '@/components/common/NoRecords';

// Lazy load components
import Navbar from "../../components/navbar/Navbar";
const ProfileHeader = lazy(() => import("../../components/camperProfile/ProfileHeader"));
const AboutMe = lazy(() => import('../../components/camperProfile/AboutMe'));
const Dreams = lazy(() => import('../../components/camperProfile/Dreams'));
const TrainingProcess = lazy(() => import('../../components/camperProfile/TrainingProcess'));
const Proyects = lazy(() => import('@/components/camperProfile/Proyects'));
const SponsorCTA = lazy(() => import('../../components/camperProfile/SponsorCTA'));
const Footer = lazy(() => import("../../components/footer/Footer"));

const CamperProfile = () => {
    const { id } = useParams(); // Obtenemos el id de la URL
    const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
    const [camperTiktoksData, setCamperTiktoksData] = useState([]); 
    const [camperMerits, setCamperMerits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Modificamos el useEffect para usar el id de la URL
    useEffect(() => {
        const loadCamperData = async () => {
            try {
                setIsLoading(true);
                const [data_infoCamper, data_tiktoks, data_merits] = await Promise.all([
                    fetchCamperById(Number(id)), // Convertimos el id a número
                    fetchTikToksByCamperId(Number(id)), // Usamos el mismo id para tiktoks
                    fetchMeritsByCamperId(Number(id)) // Y para méritos
                ]);

        setCamperData(data_infoCamper);
        setCamperTiktoksData(Array.isArray(data_tiktoks) ? data_tiktoks : []);
        setCamperMerits(Array.isArray(data_merits) ? data_merits : []);
      } catch (err) {
        setError(err.message);
        console.error("Error cargando datos:", err);
        // Establecer datos por defecto en caso de error
        setCamperData(DEFAULT_CAMPER_DATA);
        setCamperTiktoksData([]);
        setCamperMerits([]);
      } finally {
        setIsLoading(false);
      }
    };

        if (id) { // Solo cargar si hay un id
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

    const renderTrainingProcess = () => {
        if (!camperTiktoksData || camperTiktoksData.length === 0) {
            return <NoRecords title='Mi Proceso de Formacion'/>;
        }
        return (
            <TrainingProcess videos={camperTiktoksData} />
        );
    };

    return (
        <div className={`${styles.camperProfileView} flex flex-col relative`}>
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
            <div className={`${styles.profileMainContent} flex flex-col gap-4`}>
                <LazySection>
                    <div id="profile-header">
                        <ProfileHeader 
                            data={camperData}
                            initialMerits={camperMerits}
                        />
                    </div>
                </LazySection>

                <LazySection>
                    <div id="sobre-mi">
                        <AboutMe
                            videoUrl={camperData.main_video_url}
                            about={camperData.about}
                        />
                    </div>
                </LazySection>

                <LazySection>
                    <div id="sueños-grid">
                        <Dreams />
                    </div>
                </LazySection>

                <LazySection>
                    <div id="proceso-formacion">
                        {renderTrainingProcess()}
                    </div>
                </LazySection>

                <LazySection>
                    <div id="projects">
                        <Proyects />
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
            
        </div>
    );
};

export default CamperProfile;
