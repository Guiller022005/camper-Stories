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

  const [technologuies, setTechnologuies] = useState([]);

  useEffect(() => {
    const fetchTechnologuies = async () => {
      try {
        const response = await fetch(endpoints.technologies);
        const text = await response.text(); 
        console.log('Respuesta de la API:', text); 
        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (response.ok && contentType && contentType.includes("application/json")) {
          const data = JSON.parse(text); // Convertir a JSON
          console.log('tecnologias obtenidas:', data);
          setTechnologuies(data.data); // Accediendo a la propiedad 'data'
        } else {
          console.error('Error: La respuesta no es un JSON válido o hubo un problema con la solicitud.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchTechnologuies();
  }, []);

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
        <div className={styles.projectCard}>
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