import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { Code } from "lucide-react";
import styles from "./styles/ProjectCardEdit.module.css";
import { getTechnologyForProject } from "../../services/technologiesService";

function ProjectCardEdit({ id, title, description, image, codeUrl, onEdit }) {
  const [projectTechnologies, setProjectTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar las tecnologías específicas de este proyecto
  useEffect(() => {
    const loadProjectTechnologies = async () => {
      try {
        setLoading(true);
        const response = await getTechnologyForProject(id);
        const technologies = response.technologies || [];
        setProjectTechnologies(technologies);
      } catch (error) {
        console.error("Error al cargar tecnologías del proyecto:", error);
        setProjectTechnologies([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjectTechnologies();
  }, [id]);

  return (
    <Card
      className={styles.projectCard}
      cover={
        <img alt={title} src={image} className={styles.projectCardImage} />
      }
    >
      <h3 className={styles.projectCardTitle}>{title}</h3>
      <p className={styles.projectCardDescription}>{description}</p>

      <div className={styles.projectCardTech}>
        {projectTechnologies.map((tech, index) => (
          <Tag key={index} className={styles.projectCardTag}>
            {tech}
          </Tag>
        ))}
      </div>

      <div className={styles.projectCardButtons}>
        <Button
          href={codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectCardButton}
          icon={<Code className={styles.projectCardIcon} />}
          block
        >
          Ver Código
        </Button>

        <Button onClick={onEdit} className={styles.projectCardButton} block>
          Editar
        </Button>
      </div>
    </Card>
  );
}

export default ProjectCardEdit;
