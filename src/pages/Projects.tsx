import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {setSelectedTech, fetchGitHubProjects} from '../store/projectsSlice';
import {Project} from '../types/Project';
import {AddProject} from '../components/AddProject';
import {ALL_TECHNOLOGIES, TECHNOLOGIES_LIST} from '../constants/technologies';
import {useLocalStorage} from '../utils/localStorage';
import '../styles/Projects.css';
import {GITHUB_USERNAME} from '../constants/github.ts';

const Projects: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isAddProjectFormVisible, setIsAddProjectFormVisible] = useState<boolean>(false);
    const [storedSelectedTech, setStoredSelectedTech] = useLocalStorage<string>('selectedTech', ALL_TECHNOLOGIES);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {items: projects, selectedTech, loading, error} = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(fetchGitHubProjects(GITHUB_USERNAME))
            .catch((err) => {
                setErrorMessage('Ошибка при загрузке проектов. Попробуйте позже.');
                console.error(err);
            });
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

    const handleRefresh = () => {
        dispatch(fetchGitHubProjects(GITHUB_USERNAME))
            .catch((err) => {
                setErrorMessage('Ошибка при обновлении проектов. Попробуйте позже.');
                console.error(err);
            });
    };

    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>

            <button className="add-project-btn" onClick={toggleFormVisibility}>
                {isAddProjectFormVisible ? 'Закрыть форму' : 'Добавить новый проект'}
            </button>

            {isAddProjectFormVisible && <AddProject/>}

            <button className="refresh-projects-btn" onClick={handleRefresh}>
                Обновить проекты
            </button>

            {loading && <div>Загрузка...</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            <div className="filter">
                <label htmlFor="tech-select">Выберите технологию:</label>
                <select id="tech-select" value={selectedTech} onChange={handleTechChange}>
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
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
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
