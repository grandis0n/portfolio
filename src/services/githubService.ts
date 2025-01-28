import axios from 'axios';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
}

const GITHUB_API_URL = 'https://api.github.com/users/grandis0n/repos';

export const getGitHubProjects = async (username: string): Promise<GitHubRepo[]> => {
    try {
        const response = await axios.get<GitHubRepo[]>(`${GITHUB_API_URL.replace('{username}', username)}?per_page=100`);

        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error('Не удалось загрузить проекты с GitHub');
    }
};
