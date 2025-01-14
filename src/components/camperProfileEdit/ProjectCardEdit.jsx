import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { Code } from "lucide-react";
import styles from "./styles/ProjectCardEdit.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getTechnologyForProject } from "../../services/technologiesService";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProjectCardEdit({ id, title, description, image, codeUrl, onEdit }) {
  const [projectTechnologies, setProjectTechnologies] = useState([]);

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
      <div className={styles.projectCardTech}>
        {projectTechnologies.map((tech, index) => (
          <Tag key={index} className={styles.projectCardTag}>
            {tech}
          </Tag>
        ))}
      </div>

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
    </Card>
  );
}

export default ProjectCardEdit;
