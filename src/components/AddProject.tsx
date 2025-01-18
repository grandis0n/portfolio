import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../store/projectsSlice';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddProject.css';

const AddProject: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [technologies, setTechnologies] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors: { [key: string]: string } = {};
        if (!title) formErrors.title = 'Название проекта обязательно';
        if (!description) formErrors.description = 'Описание обязательно';
        if (!technologies) formErrors.technologies = 'Технологии обязательны';
        if (!link) formErrors.link = 'Ссылка обязательна';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const newProject: Project = {
            id: uuidv4(),
            title,
            description,
            technologies: technologies.split(',').map((tech) => tech.trim()),
            link,
        };

        dispatch(addProject(newProject));

        setTitle('');
        setDescription('');
        setTechnologies('');
        setLink('');
        setErrors({});
    };

    return (
        <div className="add-project-container">
            <h2>Добавить новый проект</h2>
            <form onSubmit={handleSubmit} className="add-project-form">
                <div className="form-group">
                    <label htmlFor="title">Название проекта</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название проекта"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание проекта"
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="technologies">Технологии</label>
                    <input
                        type="text"
                        id="technologies"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        placeholder="Введите технологии через запятую"
                    />
                    {errors.technologies && <span className="error-message">{errors.technologies}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="link">Ссылка на проект</label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Введите ссылку на проект"
                    />
                    {errors.link && <span className="error-message">{errors.link}</span>}
                </div>

                <button type="submit" className="submit-btn">Добавить проект</button>
            </form>
        </div>
    );
};

export default AddProject;
