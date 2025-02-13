import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import {
  getProjects,
  addProjects,
  updateProject,
  deleteProject,
} from "../../services/proyectsService";
import { getTechnology, getTechnologyForProject } from "../../services/technologiesService";
import NoRecords from "../common/NoRecords";
import { ProyectsModal } from "./modals/ProyectsModal";
import { ProyectsEditModal } from "./modals/ProyectsEditModal";
import { toast } from "react-toastify";
import styles from "./styles/Proyects.module.css";

const Proyects = ({ isEditable, onUpdate }) => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  // Función auxiliar para cargar y formatear proyectos
  const loadProjects = async () => {
    try {
      const projectsData = await getProjects(id);
      const formattedProjects = projectsData.map((project) => ({
        id: project.id,
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        code_url: project.code_url || "",
        // Se inicializa technologies (útil en modo editable)
        technologies: project.technologies || [],
      }));
      return formattedProjects;
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      setError("Error al cargar proyectos");
      return [];
    }
  };

  // Efecto para cargar proyectos (se ejecuta al montar o cuando cambie "id")
  useEffect(() => {
    let isMounted = true;
    loadProjects().then((formattedProjects) => {
      if (isMounted) setProjects(formattedProjects);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Efecto para cargar las tecnologías disponibles
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

  // Eliminar proyecto
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(id, projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
      toast.success("Proyecto eliminado con éxito");
    } catch (error) {
      console.error("Error eliminando el proyecto:", error);
      toast.error("Error al eliminar el proyecto");
    }
  };

  // Editar proyecto: carga las tecnologías específicas y asigna el proyecto a editar
  const handleEditProject = async (project) => {
    try {
      const response = await getTechnologyForProject(project.id);
      const techIds = response.technologies?.map((tech) => tech.id) || [];
      setSelectedProject({
        ...project,
        technologyIds: techIds,
      });
    } catch (error) {
      console.error("Error al cargar tecnologías del proyecto:", error);
      setSelectedProject({
        ...project,
        technologyIds: [],
      });
    }
  };

  // Actualizar proyecto
  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await updateProject(id, updatedProject.id, updatedProject);
      if (response) {
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === updatedProject.id ? updatedProject : proj
          )
        );
        setSelectedProject(null);
      }
    } catch (error) {
      toast.error("Error al actualizar el proyecto", error);
    }
  };

  // Agregar proyecto y recargar la lista
  const handleAddProject = async (newProject) => {
    try {
      const response = await addProjects(newProject);
      if (response) {
        const formattedProjects = await loadProjects();
        setProjects(formattedProjects);
        onUpdate();
      }
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
      alert("Error al añadir el proyecto");
    }
  };

  // Renderizado: si no hay proyectos y no es modo editable se muestra NoRecords
  if (!projects || (projects.length === 0 && !isEditable))
    return <NoRecords title="Mis Proyectos" />;

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
              />
            </div>
          </div>

          {/* Se muestra mensaje de error o las tarjetas de proyecto */}
          {error ? (
            <div className={styles.projectCard}>
              <div className={styles.projectCardAdd}>
                <div className="text-center p-4">
                  El camper no tiene proyectos disponibles...
                </div>
              </div>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <ProjectCard
                  {...project}
                  onEdit={() => handleEditProject(project)}
                  isEditable={isEditable}
                  onDelete={handleDeleteProject}
                />
              </div>
            ))
          )}

          {/* Modal de edición */}
          {selectedProject && (
            <ProyectsEditModal
              project={selectedProject}
              technologies={availableTechnologies}
              onUpdateProject={handleUpdateProject}
              onClose={() => setSelectedProject(null)}
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
              codeUrl={project.codeUrl || project.code_url}
              isEditable={isEditable}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Proyects;
