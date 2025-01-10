// ProyectsEdit.jsx
import React, { useEffect, useState } from "react";
import ProjectCardEdit from "./ProjectCardEdit";
import { ProyectsModal } from "./modals/ProyectsModal";
import { ProyectsEditModal } from "./modals/ProyectsEditModal";
import styles from "./styles/ProyectsEdit.module.css";
import { getProjects, addProjects } from "../../services/proyectsService";
import { getTechnology } from "../../services/technologiesService";

const ProyectsEdit = () => {
  const [projects, setProjects] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar todas las tecnologías disponibles para los modales de edición/creación
  useEffect(() => {
    const loadAvailableTechnologies = async () => {
      try {
        setLoading(true);
        const response = await getTechnology();
        setAvailableTechnologies(response.technologies || []);
      } catch (error) {
        console.error("Error al cargar tecnologías disponibles:", error);
        setAvailableTechnologies([]);
      } finally {
        setLoading(false);
      }
    };

    loadAvailableTechnologies();
  }, []);

  // Cargar los proyectos
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects(58);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = async (newProject) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await addProjects(userId, newProject);
      if (!response.ok) {
        throw new Error("Error al enviar la información");
      }
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === updatedProject.id ? updatedProject : proj
      )
    );
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
          <div className={styles.projectCardAdd}>
            <ProyectsModal
              onAddProject={handleAddProject}
              technologies={availableTechnologies}
              initialData={null}
              closeModal={() => {
                setIsEditing(false);
                setSelectedProject(null);
              }}
            />
          </div>
        </div>

        {projects.map((project) => (
          <ProjectCardEdit
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            codeUrl={project.codeUrl}
            onEdit={handleEditProject}
          />
        ))}

        {isEditing && selectedProject && (
          <ProyectsEditModal
            project={selectedProject}
            technologies={availableTechnologies}
            onUpdateProject={handleUpdateProject}
            onClose={() => {
              setIsEditing(false);
              setSelectedProject(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProyectsEdit;
