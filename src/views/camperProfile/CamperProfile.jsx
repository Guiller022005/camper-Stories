import React, { useEffect, useState } from 'react';
import styles from './styles/CamperProfile.module.css';
import NavbarProfile from '../../components/navbar/NavbarProfile';
import ProfileHeader from "../../components/camperProfile/ProfileHeader";
import AboutMe from '../../components/camperProfile/AboutMe';
import Dreams from '../../components/camperProfile/Dreams';
import TrainingProcess from '../../components/camperProfile/TrainingProcess';
import Proyects from '@/components/camperProfile/Proyects';
import Footer from "../../components/footer/Footer";
import SponsorCTA from '../../components/camperProfile/SponsorCTA';
import camper from '../../data/camperProfilePage';
import { fetchCamperById } from '../../services/camperService';

const CamperProfile = () => {
    const [camperData, setCamperData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Obtener informacion del camper por id
    useEffect(() => {
        const loadCamper = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCamperById(52);
                setCamperData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadCamper();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={styles.camperProfileView}>
            <NavbarProfile />
            <div className={styles.profileMainContent}>
                <ProfileHeader
                    data={camperData}
                    initialMerits={camper.skills}
                />
                <AboutMe
                    videoUrl={camper.mainVideo}
                    about={camper.about}
                />
                <Dreams />
                <TrainingProcess 
                    videos={camper.processTikToks} 
                />
                <Proyects 
                    projects={camper.projects} 
                />
                <SponsorCTA />
            </div>
            <Footer />
        </div>
    );
};

export default CamperProfile;