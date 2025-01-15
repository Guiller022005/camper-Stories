import React, { useState, useEffect } from "react";
import { Card, Button, Tag } from "antd";
import { Code } from "lucide-react";
import styles from "./styles/ProjectCardEdit.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getTechnologyForProject } from "../../services/technologiesService";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProjectCardEdit({ id, title, description, image, code_url, onEdit }) {
  const [projectTechnologies, setProjectTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleEdit = () => {
    // Crear el objeto con todos los datos del proyecto
    const projectData = {
      id,
      title,
      description,
      image,
      code_url,
      technologies: projectTechnologies // Usar las tecnologías cargadas
    };
    onEdit(projectData);
  };

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
          <Tag key={index} className={styles.projectCardBadge}>
            {tech}
          </Tag>
        ))}
      </div>

      <Button
        href={code_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectCardButton}
        icon={<Code className={styles.projectCardIcon} />}
        block
      >
        Ver Código
      </Button>

      <Button onClick={handleEdit} className={styles.projectCardButton} block>
        Editar
      </Button>
    </Card>
  );
}

export default ProjectCardEdit;
