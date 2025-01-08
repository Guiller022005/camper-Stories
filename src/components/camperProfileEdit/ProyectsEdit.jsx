// ProyectsEdit.jsx
import React, { useState } from 'react';
import ProjectCardEdit from './ProjectCardEdit';
import { ProyectsModal } from './modals/ProyectsModal';
import { ProyectsEditModal } from './modals/ProyectsEditModal';
import styles from './styles/ProyectsEdit.module.css';

const ProyectsEdit = () => {
  const [projects, setProjects] = useState([
    {
      title: "E-commerce Platform",
      description: "Una plataforma de comercio electrónico completa con carrito de compras, pagos y gestión de pedidos.",
      image: "src/assets/proyecto.png",
      technologies: ["React", "Node.js", "MongoDB"],
      codeUrl: "https://github.com/example/e-commerce",
    },
    {
      title: "Task Manager App",
      description: "Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real.",
      image: "src/assets/proyecto.png",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      codeUrl: "https://github.com/example/task-manager",
    },
    {
      title: "Weather Forecast Dashboard",
      description: "Dashboard interactivo que muestra pronósticos del tiempo utilizando datos de API en tiempo real.",
      image: "src/assets/proyecto.png",
      technologies: ["React", "D3.js", "Weather API"],
      codeUrl: "https://github.com/example/weather-dashboard",
    },
  ]);

  const [technologuies] = useState([
    { name: "React" },
    { name: "Css" },
    { name: "Node" },
    { name: "Java" },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.title === selectedProject.title ? updatedProject : proj
      )
    );
    setIsEditing(false);
    setSelectedProject(null);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedProject(null);
  };

  return (
    <section className={styles.tecInfo}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
      </h2>
      
      <div className={styles.projects} id="projects-profile">
        <div className={styles.addCardContainer}>
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
          <ProjectCardEdit
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
  );
};

export default ProyectsEdit;