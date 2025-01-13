import React from 'react';
import { Card, Button, Tag } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Code } from 'lucide-react';
import './styles/ProjectCard.css';

function ProjectCard({ title, description, image, technologies, codeUrl, onEdit }) {
  return (
    <Card
      className="project-card"
      hoverable
      cover={
        <LazyLoadImage
          src={image}
          alt={title}
          effect="blur"
          className="project-card-img"
        />
      }
    >
      <Card.Meta title={title} description={description} className="project-card-meta" />
      <div className="project-card-techs">
        {technologies.map((tech) => (
          <Tag key={tech} color="default" className="project-card-badge">
            {tech}
          </Tag>
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
    </Card>
  );
}

export default ProjectCard;
