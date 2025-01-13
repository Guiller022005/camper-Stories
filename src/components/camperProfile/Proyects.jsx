import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../services/proyectsService";
import { getTechnologyForProject } from "../../services/technologiesService";
import styles from "./styles/Proyects.module.css";

const Proyects = () => {
  const [projects, setProjects] = useState([]);
  const [techProject, setTechProject] = useState();
  const [loading, setLoading] = useState(false); // Añadir esto
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const id = localStorage.getItem("userId");
        setLoading(true);
        const projectsData = await getProjects(57);

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

  // Show loading state while initial projects are being fetched
  if (loading && projects.length === 0) {
    return <div>Cargando proyectos...</div>;
  }

  // Show error state if initial loading failed
  if (error && projects.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.tecInfo}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
      </h2>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies || []}
            codeUrl={project.codeUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Proyects;
