import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProjects, setSelectedTech } from '../store/projectsSlice';
import { projectsData } from '../data/projects';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    const dispatch = useDispatch();

    const projects = useSelector((state: RootState) => state.projects.items);
    const selectedTech = useSelector((state: RootState) => state.projects.selectedTech);

    useEffect(() => {
        dispatch(setProjects(projectsData));
    }, [dispatch]);

    const filteredProjects = projects.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>

            <div className="filter">
                <label htmlFor="tech-select">Выберите технологию:</label>
                <select
                    id="tech-select"
                    value={selectedTech}
                    onChange={(e) => dispatch(setSelectedTech(e.target.value))}
                >
                    <option value="All">Все</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Dart">Dart</option>
                    <option value="Flutter">Flutter</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Flask">Flask</option>
                </select>
            </div>

            <div className="projects-list">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>
                                <strong>Технологии:</strong> {project.technologies.join(', ')}
                            </p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                            >
                                Смотреть на GitHub
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Проекты не найдены для выбранной технологии.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
