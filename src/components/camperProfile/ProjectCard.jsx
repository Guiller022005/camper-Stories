import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Code } from "lucide-react";
import { getTechnologyForProject } from "../../services/technologiesService";
import styles from "./styles/ProjectCard.module.css";

function ProjectCard({
  id,
  title,
  description,
  image, 
  codeUrl,
  onEdit,
}) {
  const [projectTechnologies, setProjectTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar las tecnologías específicas de este proyecto
  useEffect(() => {
    const loadProjectTechnologies = async () => {
      try {
        setLoading(true);
        const response = await getTechnologyForProject(id);
        console.log(response);
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
          {projectTechnologies.map((tech) => (
            <Tag key={tech} color="default" className={styles.projectCardBadge}>
              {tech}
            </Tag>
          ))}
        </div>
      )}
      <Button
        icon={<Code />}
        href={codeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectCardButton}
        block
      >
        Ver Código
      </Button>
    </Card>
  );
}

export default ProjectCard;
