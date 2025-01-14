import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../services/proyectsService";
import { getTechnologyForProject } from "../../services/technologiesService";
import styles from "./styles/Proyects.module.css";

const Proyects = () => {
  const [projects, setProjects] = useState([]);
  const [techProject, setTechProject] = useState();
  const [loading, setLoading] = useState(false); // Añadir esto
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects(id);

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

  return (
    <section className={styles.tecInfo}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
      </h2>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            id={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            codeUrl={project.codeUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Proyects;
