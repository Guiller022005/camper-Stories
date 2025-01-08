import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from "../../components/camperProfile/ProjectCard";
import Footer from "../../components/footer/Footer";
import styles from './styles/CamperProfileEdit.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import NavbarProfile from '../../components/navbar/NavbarProfile';
import { ProyectsModal } from '@/components/camperProfileEdit/modals/ProyectsModal';
import { ProyectsEditModal } from '@/components/camperProfileEdit/modals/ProyectsEditModal';
import { Dialog } from '@/components/ui/dialog';
import camper from '../../data/camperProfilePage';
import ProfileHeaderEdit from "../../components/camperProfileEdit/ProfileHeaderEdit";
import AboutMeEdit from "../../components/camperProfileEdit/AboutMeEdit";
import DreamsEdit from '../../components/camperProfileEdit/DreamsEdit';
import TrainingProcessEdit from '../../components/camperProfileEdit/TrainingProcessEdit';

const CamperProfileEdit = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const [technologuies] = useState ([
        {
            name: "React"
        },
        {
            name: "Css"
        },
        {
            name: "Node"
        },
        {
            name: "Java"
        },
    ])

    const [projects, setProjects] = useState([
        {
            title: "E-commerce Platform",
            description:
                "Una plataforma de comercio electrónico completa con carrito de compras, pagos y gestión de pedidos.",
            image: "src/assets/proyecto.png",
            technologies: ["React", "Node.js", "MongoDB"],
            codeUrl: "https://github.com/example/e-commerce",
        },
        {
            title: "Task Manager App",
            description:
                "Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real.",
            image: "src/assets/proyecto.png",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            codeUrl: "https://github.com/example/task-manager",
        },
        {
            title: "Weather Forecast Dashboard",
            description:
                "Dashboard interactivo que muestra pronósticos del tiempo utilizando datos de API en tiempo real.",
            image: "src/assets/proyecto.png",
            technologies: ["React", "D3.js", "Weather API"],
            codeUrl: "https://github.com/example/weather-dashboard",
        },
    ]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const swiperRef = useRef(null);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Forzar actualización del Swiper cuando cambia isMobile
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
        }
    }, [isMobile]);

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };

    const handleAddProject = (newProject) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
      };
    
    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsEditing(true); // Abrir el modal
    };
    
    const handleUpdateProject = (updatedProject) => {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.title === selectedProject.title ? updatedProject : proj
          )
        );
        setIsEditing(false); // Cerrar el modal
        setSelectedProject(null);
    };
    
    const closeEditModal = () => {
        setIsEditing(false);
        setSelectedProject(null);
    };

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
                
                <section className={styles.tecInfo}>
                    <h2 className={styles.profileSubtitle}>
                        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
                    </h2>
                    
                    <div className={styles.projects} id="projects-profile">
                        <div className={styles['add-card--container']}>
                            <div>
                                <ProyectsModal
                                    onAddProject={isEditing ? handleUpdateProject : handleAddProject}
                                    technologuies={technologuies} 
                                    initialData={isEditing ? selectedProject : null}
                                    closeModal={() => {
                                    setIsEditing(false);
                                    setSelectedProject(null);
                                    }}
                                />
                            </div>      
                        </div>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                technologies={project.technologies}
                                codeUrl={project.codeUrl}
                                onEdit={() => handleEditProject(project)}
                            />
                        ))}
                        {isEditing && selectedProject && (
                            <ProyectsEditModal
                            project={selectedProject}
                            technologuies={technologuies} 
                            onUpdateProject={handleUpdateProject}
                            onClose={closeEditModal}
                            />
                        )}
                    </div>
                </section>
 
                <section className={styles.sponsorCallToAction} id="patrocinar-profile">
                    <p className={styles.ctaText}>
                        "Con tu apoyo, puedo continuar desarrollando habilidades y creando soluciones innovadoras. ¡Gracias por creer en mi potencial!"
                    </p>
                    <button className={styles.btnSponsor}>Patrocinar Ahora</button>
                    <Dialog />
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default CamperProfileEdit;