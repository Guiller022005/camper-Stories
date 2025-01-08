import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Code } from 'lucide-react';
import './styles/ProjectCard.css';

function ProjectCard({ title, description, image, technologies, codeUrl, onEdit }) {
  
  return (
    <Card className="project-card" hoverable cover={<img src={image} className="project-card-img" />}>
      <Card.Meta title={title} description={description} className="project-card-meta" />
      <div className="project-card-techs">
        {technologies.map((tech) => (
          <Tag key={tech} color="default" className="project-card-badge">{tech}</Tag>
        ))}
      </div>
      <Button
        icon={<Code />}
        href={codeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-button"
        block
      >
        Ver Código 
      </Button>
      <button className="edit-button" onClick={onEdit}>
          Editar
      </button>
    </Card>
  );
}

export default ProjectCard;
