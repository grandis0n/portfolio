import React from 'react';
import { projects } from '../data/projects';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>
            <div className="projects-list">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p><strong>Технологии:</strong> {project.technologies.join(', ')}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                            Смотреть на GitHub
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
