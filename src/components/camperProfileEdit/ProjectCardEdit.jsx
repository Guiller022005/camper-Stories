// ProjectCardEdit.jsx
import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Code } from 'lucide-react';
import styles from './styles/ProjectCardEdit.module.css';

function ProjectCardEdit({ title, description, image, technologies, codeUrl, onEdit }) {
  return (
    <Card 
      className={styles.projectCard} 
      hoverable 
      cover={<img src={image} className={styles.projectCardImg} />}
    >
      <Card.Meta 
        title={title} 
        description={description} 
        className={styles.projectCardMeta} 
      />
      <div className={styles.projectCardTechs}>
        {technologies.map((tech) => (
          <Tag 
            key={tech} 
            color="default" 
            className={styles.projectCardBadge}
          >
            {tech}
          </Tag>
        ))}
      </div>
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