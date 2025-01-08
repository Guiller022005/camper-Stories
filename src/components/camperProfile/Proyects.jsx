import React from 'react';
import ProjectCard from './ProjectCard';
import styles from './styles/Proyects.module.css';

const Proyects = ({ projects }) => {
  return (
    <section className={styles.tecInfo}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mis Proyectos
      </h2>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
            codeUrl={project.codeUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Proyects;