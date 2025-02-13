import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Code, Trash2 } from "lucide-react"; // Añadido Trash2 para el icono de eliminar
import { getTechnologyForProject } from "../../services/technologiesService";
import styles from "./styles/ProjectCard.module.css";

function ProjectCard({ id, title, description, image, code_url, onEdit, onDelete, isEditable }) {
  const [projectTechnologies, setProjectTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjectTechnologies = async () => {
      try {
        setLoading(true);
        const response = await getTechnologyForProject(id);
        const techNames = response.technologies.map((tech) => tech.name);
        setProjectTechnologies(techNames);
      } catch (error) {
        console.error("Error al cargar tecnologías del proyecto:", error);
        setProjectTechnologies([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjectTechnologies();
  }, [id]);

  const handleEdit = () => {
    const projectData = {
      id,
      title,
      description,
      image,
      code_url,
      technologies: projectTechnologies
    };
    onEdit(projectData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id); // Llama a la función de eliminación con el ID del proyecto
    }
  };

  return (
    <Card
      className={styles.projectCard}
      hoverable
      cover={
        <LazyLoadImage
          src={image}
          alt={title}
          effect="blur"
          className={styles.projectCardImg}
        />
      }
    >
      <Card.Meta
        title={title}
        description={description}
        className={styles.projectCardMeta}
      />
      {/* Renderiza las tecnologías si están disponibles */}
      {Array.isArray(projectTechnologies) && projectTechnologies.length > 0 && (
        <div className={styles.projectCardTechs}>
          {projectTechnologies.map((tech, index) => (
            <Tag key={index} className={styles.projectCardBadge}>
              {tech}
            </Tag>
          ))}
        </div>
      )}

      {/* Botón para ver código */}
      <Button
        icon={<Code />}
        href={code_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectCardButton}
        block
      >
        Ver Código
      </Button>

      {/* Botón para editar */}
      {isEditable && (
        <Button onClick={handleEdit} className={styles.projectCardButton} block>
          Editar
        </Button>
      )}

      {/* Botón para eliminar */}
      {isEditable && (
        <Button
          onClick={handleDelete}
          icon={<Trash2 />}
          className={`${styles.projectCardButton} ${styles.deleteButton}`}
          block
          danger
        >
          Eliminar
        </Button>
      )}
    </Card>
  );
}

export default ProjectCard;
