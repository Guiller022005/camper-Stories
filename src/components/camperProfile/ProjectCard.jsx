import React from "react";
import { Card, Button, Tag } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Code } from "lucide-react";
import styles from "./styles/ProjectCard.css";

function ProjectCardEdit({
  title,
  description,
  image,
  technologies = [], // Provide default empty array
  codeUrl,
  onEdit,
}) {
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
      {Array.isArray(technologies) && technologies.length > 0 && (
        <div className={styles.projectCardTechs}>
          {technologies.map((tech) => (
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
      <button className={styles.editButton} onClick={onEdit}>
        Editar
      </button>
    </Card>
  );
}

export default ProjectCardEdit;
