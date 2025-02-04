import axios from 'axios';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
}

const GITHUB_PER_PAGE = 100;

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

const githubAPI = axios.create({
    baseURL: 'https://api.github.com',
});

githubAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response
            ? `Ошибка при загрузке данных: ${error.response.status} - ${error.response.statusText}`
            : 'Не удалось подключиться к GitHub API. Попробуйте позже.';
        return Promise.reject(new Error(errorMessage));
    }
);

const validateUsername = (username: string): boolean => {
    return USERNAME_REGEX.test(username);
};

export const getGitHubProjects = async (username: string): Promise<GitHubRepo[]> => {
    if (!username || !validateUsername(username)) {
        throw new Error('Неверное имя пользователя. Оно должно содержать только буквы, цифры, дефисы и подчеркивания.');
    }
    try {
        const response = await githubAPI.get<GitHubRepo[]>(`/users/${username}/repos?per_page=${GITHUB_PER_PAGE}`);
        return response.data;
    } catch (error: unknown) {
        if ((error as { response?: never }).response) {
            const axiosError = error as { response: { status: number; statusText: string } };
            throw new Error(
                `Ошибка при загрузке данных: ${axiosError.response.status} - ${axiosError.response.statusText}`
            );
        } else if (error instanceof Error) {
            throw new Error(error.message || 'Не удалось загрузить проекты с GitHub');
        } else {
            throw new Error('Не удалось загрузить проекты с GitHub');
        }
    }
};
