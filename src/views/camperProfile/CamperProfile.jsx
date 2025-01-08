import React from 'react';
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

const CamperProfile = () => {
    return (
        <div className={styles.camperProfileView}>
            <NavbarProfile />
            <div className={styles.profileMainContent}>
                <ProfileHeader
                    skills={camper.skills}
                    name={camper.name}
                    ciudadOrigen={camper.ciudadOrigen}
                    edad={camper.edad}
                    mainImage={camper.mainImage}
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