import React, { useEffect, useState, lazy } from 'react';
import NavbarProfile from '../../components/navbar/NavbarProfile';
import Footer from "../../components/footer/Footer";
import camper from '../../data/camperProfilePage';
import { fetchCamperById } from '../../services/camperService';
import styles from './styles/CamperProfile.module.css';
import LazySection from '../../components/common/LazySection';
import { DEFAULT_CAMPER_DATA } from '@/data/dataDefault';

// Lazy load components
const ProfileHeader = lazy(() => import("../../components/camperProfile/ProfileHeader"));
const AboutMe = lazy(() => import('../../components/camperProfile/AboutMe'));
const Dreams = lazy(() => import('../../components/camperProfile/Dreams'));
const TrainingProcess = lazy(() => import('../../components/camperProfile/TrainingProcess'));
const Proyects = lazy(() => import('@/components/camperProfile/Proyects'));
const SponsorCTA = lazy(() => import('../../components/camperProfile/SponsorCTA'));

const CamperProfile = () => {
    const [camperData, setCamperData] = useState(DEFAULT_CAMPER_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch campers by id
    useEffect(() => {
        const loadCamper = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCamperById(52);
                console.log("Data recibida:", data); // Veamos qué datos recibimos
                setCamperData(data);
            } catch (err) {
                setError(err.message);
                console.error('Error cargando datos del camper:', err);
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
                    <ProfileHeader
                        data={camperData}
                        initialMerits={camperData.merits}
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
                    <TrainingProcess
                        videos={camper.processTikToks}
                    />
                </LazySection>

                <LazySection>
                    <Proyects
                        projects={camper.projects}
                    />
                </LazySection>

                <LazySection>
                    <SponsorCTA />
                </LazySection>
            </div>
            <Footer />
        </div>
    );
};

export default CamperProfile;