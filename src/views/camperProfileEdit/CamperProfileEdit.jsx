import React, { useEffect, useState} from 'react';
import styles from './styles/CamperProfileEdit.module.css';
import NavbarProfile from '../../components/navbar/NavbarProfile';
import camper from '../../data/camperProfilePage';
import ProfileHeaderEdit from "../../components/camperProfileEdit/ProfileHeaderEdit";
import AboutMeEdit from "../../components/camperProfileEdit/AboutMeEdit";
import DreamsEdit from '../../components/camperProfileEdit/DreamsEdit';
import TrainingProcessEdit from '../../components/camperProfileEdit/TrainingProcessEdit';
import ProyectsEdit from '../../components/camperProfileEdit/ProyectsEdit';
import Footer from "../../components/footer/Footer";
import SponsorCTAEdit from '@/components/camperProfileEdit/SponsorCTAEdit';
import { fetchCamperById } from '@/services/camperService';
import { fetchCamperById } from '@/services/camperService';

const CamperProfileEdit = () => {
    const [camperData, setCamperData] = useState(null);

    // Obtener informacion del camper por id
    useEffect(() => {
        const loadCamper = async () => {
            try {
                const data = await fetchCamperById(109);
                setCamperData(data);
            } catch (err) {
                console.log(err);
            }
        };
        loadCamper();
    }, []);

    return (
        <div className={styles.camperProfileView}>
            <NavbarProfile />
            <div className={styles.profileMainContent}>
                <ProfileHeaderEdit
                    data={camperData}
                    initialMerits={camper.skills}
                />
                <AboutMeEdit
                    videoUrl={camper.mainVideo}
                    about={camper.about}
                    camperInfoInitialData={camper}
                />
                <DreamsEdit />
                <TrainingProcessEdit
                    videos={camper.processTikToks} 
                />
                <ProyectsEdit
                    projects={camper.projects}
                />
                <SponsorCTAEdit />
            </div>
            <Footer />
        </div>
    );
};

export default CamperProfileEdit;