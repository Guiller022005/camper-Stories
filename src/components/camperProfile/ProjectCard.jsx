import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Code } from "lucide-react";
import { getTechnologyForProject } from "../../services/technologiesService";
import styles from "./styles/ProjectCard.module.css";

function ProjectCard({ id, title, description, image, code_url, onEdit, isEditable }) {
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
      {/* Only render technologies section if there are technologies */} 
      {Array.isArray(projectTechnologies) && projectTechnologies.length > 0 && (
        <div className={styles.projectCardTechs}>
          {projectTechnologies.map((tech, index) => (
            <Tag key={index} className={styles.projectCardBadge}>
              {tech}
            </Tag>
          ))}
        </div>
      )}

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

      {isEditable && (
        <Button onClick={handleEdit} className={styles.projectCardButton} block>
          Editar
        </Button>
      )}
    </Card>
  );
}

export default ProjectCard;
