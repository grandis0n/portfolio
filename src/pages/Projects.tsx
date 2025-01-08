import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';

interface Project {
    name: string;
    description: string;
    html_url: string;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                let allProjects: Project[] = [];
                let page = 1;
                let hasNextPage = true;

                while (hasNextPage) {
                    const response = await fetch(`https://api.github.com/users/grandis0n/repos?per_page=100&page=${page}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке данных с GitHub');
                    }

                    const data = await response.json();
                    allProjects = allProjects.concat(data);
                    hasNextPage = data.length === 100;
                    page++;
                }

                setProjects(allProjects);
                setLoading(false);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Неизвестная ошибка');
                }
                setLoading(false);
            }
        };

        fetchAllProjects();
    }, []);

    if (loading) {
        return <div className="projects-container">Загрузка...</div>;
    }

    if (error) {
        return <div className="projects-container">Ошибка: {error}</div>;
    }

    return (
        <div className="projects-container">
            <h1>Мои проекты</h1>
            <div className="projects-list">
                {projects.map((project) => (
                    <div key={project.name} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description || 'Нет описания'}</p>
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                            Смотреть на GitHub
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
