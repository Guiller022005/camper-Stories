import React from 'react';
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

const CamperProfileEdit = () => {
    return (
        <div className={styles.camperProfileView}>
            <NavbarProfile />
            <div className={styles.profileMainContent}>
                <ProfileHeaderEdit
                    skills={camper.skills}
                    name={camper.name}
                    ciudadOrigen={camper.ciudadOrigen}
                    edad={camper.edad}
                    mainImage={camper.mainImage}
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