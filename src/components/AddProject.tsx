import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../store/projectsSlice';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddProject.css';

interface FormErrors {
    [key: string]: string;
}

const FormField: React.FC<{
    label: string;
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    errorMessage?: string;
}> = ({ label, type, id, value, onChange, placeholder, errorMessage }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        ) : (
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        )}
        {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
);

export const AddProject: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [technologies, setTechnologies] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});

    const isValidURL = (url: string) => {
        const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
        return regex.test(url);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors: FormErrors = {};
        if (!title) formErrors.title = 'Название проекта обязательно';
        if (!description) formErrors.description = 'Описание обязательно';
        if (!technologies) formErrors.technologies = 'Технологии обязательны';
        if (!link) formErrors.link = 'Ссылка обязательна';
        if (link && !isValidURL(link)) formErrors.link = 'Некорректный URL';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const newProject: Project = {
            id: uuidv4(),
            title,
            description,
            technologies: technologies.split(',').map((tech) => tech.trim()).filter(Boolean),
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
                <FormField
                    label="Название проекта"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите название проекта"
                    errorMessage={errors.title}
                />
                <FormField
                    label="Описание"
                    type="textarea"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите описание проекта"
                    errorMessage={errors.description}
                />
                <FormField
                    label="Технологии"
                    type="text"
                    id="technologies"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="Введите технологии через запятую"
                    errorMessage={errors.technologies}
                />
                <FormField
                    label="Ссылка на проект"
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Введите ссылку на проект"
                    errorMessage={errors.link}
                />
                <button type="submit" className="submit-btn">Добавить проект</button>
            </form>
        </div>
    );
};
