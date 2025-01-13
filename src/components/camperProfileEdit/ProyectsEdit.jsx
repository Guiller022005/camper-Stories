// ProyectsEdit.jsx
import React, { useState, useEffect } from "react";
import ProjectCardEdit from "./ProjectCardEdit";
import { ProyectsModal } from "./modals/ProyectsModal";
import { ProyectsEditModal } from "./modals/ProyectsEditModal";
import styles from "./styles/ProyectsEdit.module.css";
import { getProjects, addProjects } from "../../services/proyectsService";
import {
  getTechnology,
  getTechnologyForProject,
} from "../../services/technologiesService";

const ProyectsEdit = () => {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false); // Añadir esto
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        setLoading(true);
        const technologyData = await getTechnology();
        setTechnologies(technologyData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading technologies: ", err);
        setTechnologies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnology();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const id = localStorage.getItem("userId");
        setLoading(true);
        const projectsData = await getProjects(58);

        // Initialize projects with empty technologies array
        const projectsWithEmptyTech = projectsData.map((project) => ({
          ...project,
          technologies: [],
        }));

        setProjects(projectsWithEmptyTech);

        // After setting initial projects, fetch technologies for each project
        projectsData.forEach((project) => {
          fetchTechnologyForProject(project.id);
        });

        console.log(projectsData)
      } catch (err) {
        setError(err.message);
        console.error("Error loading projects: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to fetch technologies for a specific project
  const fetchTechnologyForProject = async (projectId) => {
    try {
      const technologies = await getTechnologyForProject(projectId);

      // Update the specific project with its technologies
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, technologies } : project
        )
      );
    } catch (err) {
      console.error(
        `Error loading technologies for project ${projectId}:`,
        err
      );
    }
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = async (newProject) => {
    try {
      const id = localStorage.getItem("userId");
      const response = await addProjects(109, newProject);
      if (!response.ok) {
        throw new Error("Error al enviar la informacion");
      }
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("error", error);
    }
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
          <div className={styles.projectCardAdd}>
            <ProyectsModal
              onAddProject={isEditing ? handleUpdateProject : handleAddProject}
              technologies={technologies}
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
            technologies={technologies}
            onUpdateProject={handleUpdateProject}
            onClose={closeEditModal}
          />
        )}
      </div>
    </section>
  );
};

export default ProyectsEdit;
