// ProyectsEdit.jsx
import React, { useEffect, useState } from "react";
import ProjectCardEdit from "./ProjectCardEdit";
import { useParams } from 'react-router-dom';
import { ProyectsModal } from "./modals/ProyectsModal";
import { ProyectsEditModal } from "./modals/ProyectsEditModal";
import styles from "./styles/ProyectsEdit.module.css";
import { getProjects, addProjects } from "../../services/proyectsService";
import { getTechnology } from "../../services/technologiesService";

const ProyectsEdit = () => {
  const [projects, setProjects] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); 

  // Cargar todas las tecnologías disponibles para los modales de edición/creación
  useEffect(() => {
    const loadAvailableTechnologies = async () => {
      try {
        setLoading(true);
        const response = await getTechnology();
        console.log(response)
        setAvailableTechnologies(response.data);
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
        const projectsData = await getProjects(id);
        // Asegurarse de que los datos tengan la estructura correcta
        const formattedProjects = projectsData.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image,
          code_url: project.code_url,
          technologies: project.technologies || []
        }));
        setProjects(formattedProjects);
        
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

  const [ selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = async (newProject) => {
    try {
      const response = await addProjects(newProject);
      if (!response.ok) {
        throw new Error("Error al enviar la información");
      }
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
    }
  };

  const handleEditProject = (project) => {
    console.log("Proyecto a editar:", project); // Debug
    setSelectedProject(project);
    setIsEditing(true);
  };
  
  const handleUpdateProject = async (updatedProject) => {
    try {
      console.log("Proyecto actualizado:", updatedProject); // Debug
      const response = await updateProject(updatedProject);
      if (!response.ok){
        throw new Error("Error al enviar la informacion")
      }
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === updatedProject.id ? updatedProject : proj
        )
      );
      setIsEditing(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  console.log(availableTechnologies);

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
            code_url={project.code_url}
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
