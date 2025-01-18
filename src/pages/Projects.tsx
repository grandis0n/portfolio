import { useState } from 'react';
import { projects } from '../data/projects';
import '../styles/Projects.css';

const Projects = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');

    const filteredProjects = projects.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>

            {/* Фильтр */}
            <div className="filter-container">
                <label htmlFor="tech-filter">Фильтр по технологии:</label>
                <select
                    id="tech-filter"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                >
                    <option value="All">Все</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Dart">Dart</option>
                    <option value="Swift">Swift</option>
                </select>
            </div>

            <div className="projects-list">
                {filteredProjects.map((project) => (
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
