import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { getProjects, addProjects, updateProject } from "../../services/proyectsService";
import { getTechnology, getTechnologyForProject } from "../../services/technologiesService";
import NoRecords from "../common/NoRecords";
import { ProyectsModal } from "../camperProfileEdit/modals/ProyectsModal";
import { ProyectsEditModal } from "../camperProfileEdit/modals/ProyectsEditModal";
import { toast } from "react-toastify";
import styles from "./styles/Proyects.module.css";

const Proyects = ({ isEditable }) => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
          getTechnologyForProject(project.id);
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

  // Cargar tecnologías disponibles
  useEffect(() => {
    let isMounted = true;

    const loadAvailableTechnologies = async () => {
      try {
        const response = await getTechnology();
        if (isMounted) {
          setAvailableTechnologies(response.data || []);
        }
      } catch (error) {
        console.error("Error al cargar tecnologías:", error);
        if (isMounted) {
          setError("Error al cargar tecnologías");
          setAvailableTechnologies([]);
        }
      }
    };

    loadAvailableTechnologies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Cargar proyectos
  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects(id);

        if (isMounted) {
          const formattedProjects = projectsData.map((project) => ({
            id: project.id,
            title: project.title || "",
            description: project.description || "",
            image: project.image || "",
            code_url: project.code_url || "",
          }));
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        if (isMounted) {
          setError("Error al cargar proyectos");
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleEditProject = async (project) => {
    try {
      setLoading(true);
      // Cargar las tecnologías específicas del proyecto
      const response = await getTechnologyForProject(project.id);
      const techIds = response.technologies?.map((tech) => tech.id) || [];

      setSelectedProject({
        ...project,
        technologyIds: techIds,
      });
      setIsEditing(true);
    } catch (error) {
      console.error("Error al cargar tecnologías del proyecto:", error);
      // Aún permitimos editar el proyecto, pero sin tecnologías
      setSelectedProject({
        ...project,
        technologyIds: [],
      });
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (updatedProject) => {
    try {
      setLoading(true);
      const response = await updateProject(
        id,
        updatedProject.id,
        updatedProject
      );

      if (response) {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === updatedProject.id ? updatedProject : proj
          )
        );
        setIsEditing(false);
        setSelectedProject(null);
      }
    } catch (error) {
      toast.error("error al actualizar el proyecto", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (newProject) => {
    try {
      setLoading(true);
      const response = await addProjects(newProject);

      if (response) {
        // Recargar los proyectos después de añadir uno nuevo
        const projectsData = await getProjects(id);
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
      alert("Error al añadir el proyecto");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;

  if (!projects || projects.length === 0 && !isEditable) return <NoRecords title="Mis Proyectos" />;

  return (
    <section className={styles.tecInfo}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
      </h2>
      {isEditable ? (
        <div className={styles.projects} id="projects-profile">
          {/* Botón de añadir proyecto */}
          <div className={styles.projectCard}>
            <div className={styles.projectCardAdd}>
              <ProyectsModal
                onAddProject={handleAddProject}
                technologies={availableTechnologies}
                closeModal={() => setIsEditing(false)}
              />
            </div>
          </div>

          {/* Manejo de estados: error, carga y contenido */}
          {error ? (
            <div className={styles.projectCard}>
              <div className={styles.projectCardAdd}>
                <div className="text-center p-4">
                  El camper no tiene proyectos disponibles...
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center p-4">Cargando...</div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onEdit={() => handleEditProject(project)}
              />
            ))
          )}

          {/* Modal de edición */}
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
      ) : (
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
      )}
    </section>
  );
};

export default Proyects;
