import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles/CamperProfile.module.css';
import LazySection from '../../components/common/LazySection';
import { DEFAULT_CAMPER_DATA } from '@/data/dataDefault';

import Loader from '@/components/common/Loader';
import { fetchCamperById } from '../../services/camperService';
import { fetchTikToksByCamperId } from '@/services/tiktokService';
import { fetchMeritsByCamperId } from '@/services/meritsService';
import FloatingActionMenu from '@/components/FloatingMenu/FloatingActionMenu';
import ErrorPage from '../ErrorPage/ErrorPage';

// Lazy load components
const NavbarProfile = lazy(() => import("../../components/navbar/NavbarProfile"));
const ProfileHeader = lazy(() => import("../../components/camperProfile/ProfileHeader"));
const AboutMe = lazy(() => import('../../components/camperProfile/AboutMe'));
const Dreams = lazy(() => import('../../components/camperProfile/Dreams'));
const TrainingProcess = lazy(() => import('../../components/camperProfile/TrainingProcess'));
const Proyects = lazy(() => import('@/components/camperProfile/Proyects'));
const SponsorCTA = lazy(() => import('../../components/camperProfile/SponsorCTA'));
const Footer = lazy(() => import('../../components/footer/Footer'));


const CamperProfile = () => {
    const { id } = useParams(); // Obtenemos el id de la URL
    const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
    const [camperTiktoksData, setCamperTiktoksData] = useState([]); 
    const [camperMerits, setCamperMerits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className={`${styles.camperProfileView} flex flex-col relative`}>
            <LazySection>
                <NavbarProfile />
            </LazySection>
            <div className={`${styles.profileMainContent} flex flex-col gap-4`}>
                <LazySection>
                    <ProfileHeader 
                        data={camperData}
                        initialMerits={camperMerits}
                    />
                </LazySection>

        <LazySection>
          <AboutMe
            videoUrl={camperData.main_video_url}
            about={camperData.about}
          />
        </LazySection>

        <LazySection>
          <Dreams />
        </LazySection>

        <LazySection>
          <TrainingProcess videos={camperTiktoksData} />
        </LazySection>

                <LazySection>
                    <Proyects />
                </LazySection>

                <LazySection>
                    <SponsorCTA />
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

export default CamperProfile;
