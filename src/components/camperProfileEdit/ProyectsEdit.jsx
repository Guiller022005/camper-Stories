// ProyectsEdit.jsx
import React, { useEffect, useState } from "react";
import ProjectCardEdit from "./ProjectCardEdit";
import { ProyectsModal } from "./modals/ProyectsModal";
import { ProyectsEditModal } from "./modals/ProyectsEditModal";
import styles from "./styles/ProyectsEdit.module.css";
import { getProjects, addProjects } from "../../services/proyectsService";

const ProyectsEdit = () => {
  const [projects, setProjects] = useState([]);

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologuies = async () => {
      try {
        const response = await fetch(endpoints.technologies);
        const text = await response.text();
        console.log("Respuesta de la API:", text);
        // Verificar si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const data = JSON.parse(text); // Convertir a JSON
          console.log("tecnologias obtenidas:", data);
          setTechnologies(data.data); // Accediendo a la propiedad 'data'
        } else {
          console.error(
            "Error: La respuesta no es un JSON válido o hubo un problema con la solicitud."
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchTechnologuies();
  }, []);

  useEffect(() => {
    const fechProjects = async () => {
      try {
        const id = localStorage.getItem("userId");
        setLoading(true);
        const dreamsData = await getProjects(id);
        setProjects(dreamsData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading dreams: ", err);
      } finally {
        setLoading(false);
      }
    };

    fechProjects();
  }, []);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProject = async (newProject) => {
    try {
      const id = localStorage.getItem("userId");
      const response = await addProjects(id, newProject);
      if (!response.ok) {
        throw new Error("Error al enviar la informacion");
      }
      setProjects((prevProjects) => [...prevProjects, savedProject]); 
    } catch (error) {
      console.error("error", error)
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
          <div>
            <ProyectsModal
              onAddProject={isEditing ? handleUpdateProject : handleAddProject}
              technologuies={technologies}
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
            technologuies={technologies}
            onUpdateProject={handleUpdateProject}
            onClose={closeEditModal}
          />
        )}
      </div>
    </section>
  );
};

export default ProyectsEdit;
