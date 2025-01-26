import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setProjects, setSelectedTech} from '../store/projectsSlice';
import {projectsData} from '../data/projects';
import {Project} from '../types/Project';
import {AddProject} from '../components/AddProject';
import {ALL_TECHNOLOGIES, TECHNOLOGIES_LIST} from '../constants/technologies';
import {useLocalStorage} from '../utils/localStorage';
import '../styles/Projects.css';

const Projects: React.FC = () => {
    const dispatch = useDispatch();

    const [isAddProjectFormVisible, setIsAddProjectFormVisible] = useState<boolean>(false);

    const projects = useSelector((state: RootState) => state.projects.items);
    const selectedTech = useSelector((state: RootState) => state.projects.selectedTech);

    const [storedSelectedTech, setStoredSelectedTech] = useLocalStorage<string>('selectedTech', ALL_TECHNOLOGIES);

    useEffect(() => {
        dispatch(setProjects(projectsData));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSelectedTech(storedSelectedTech));
    }, [dispatch, storedSelectedTech]);

    const filteredProjects = projects.filter((project) =>
        selectedTech === ALL_TECHNOLOGIES ? true : project.technologies.includes(selectedTech)
    );

    const toggleFormVisibility = () => {
        setIsAddProjectFormVisible((prev) => !prev);
    };

    const handleTechChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTech = e.target.value;
        setStoredSelectedTech(newTech);
    };

    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>

            <button className="add-project-btn" onClick={toggleFormVisibility}>
                {isAddProjectFormVisible ? 'Закрыть форму' : 'Добавить новый проект'}
            </button>

            {isAddProjectFormVisible && <AddProject/>}

            <div className="filter">
                <label htmlFor="tech-select">Выберите технологию:</label>
                <select
                    id="tech-select"
                    value={selectedTech}
                    onChange={handleTechChange}
                >
                    {TECHNOLOGIES_LIST.map((tech) => (
                        <option key={tech} value={tech}>
                            {tech}
                        </option>
                    ))}
                </select>
            </div>

            <div className="projects-list">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project: Project) => (
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
