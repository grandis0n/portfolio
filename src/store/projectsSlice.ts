import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Project} from '../types/Project';
import {getGitHubProjects} from '../services/githubService';
import {ALL_TECHNOLOGIES, TECHNOLOGIES_LIST} from '../constants/technologies';

type Technology = typeof TECHNOLOGIES_LIST[number];

interface ProjectsState {
    items: Project[];
    selectedTech: Technology;
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    items: [],
    selectedTech: ALL_TECHNOLOGIES,
    loading: false,
    error: null,
};

const validateRepo = (repo: {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null
}): boolean => {
    return (
        typeof repo.id === 'number' &&
        typeof repo.name === 'string' &&
        typeof repo.html_url === 'string' &&
        (typeof repo.language === 'string' || repo.language === null)
    );
};


export const fetchGitHubProjects = createAsyncThunk<
    Project[],
    string,
    { rejectValue: string }
>(
    'projects/fetchGitHubProjects',
    async (username: string, {rejectWithValue}) => {
        try {
            const repos = await getGitHubProjects(username);

            const mappedRepos = repos.map((repo) => {
                if (!validateRepo(repo)) {
                    return null;
                }

                return {
                    id: repo.id.toString(),
                    title: repo.name,
                    description: repo.description || 'Нет описания',
                    link: repo.html_url,
                    technologies: repo.language ? [repo.language] : [],
                };
            }).filter((repo) => repo !== null);

            if (mappedRepos.length === 0) {
                return rejectWithValue('Не удалось найти корректные проекты для этого пользователя.');
            }

            return mappedRepos;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'Произошла ошибка при загрузке данных с GitHub.');
            } else {
                return rejectWithValue('Неизвестная ошибка при загрузке данных.');
            }
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload;
            localStorage.setItem('projects', JSON.stringify(state.items));
        },
        addProject(state, action: PayloadAction<Project>) {
            state.items.push(action.payload);
            localStorage.setItem('projects', JSON.stringify(state.items));
        },
        setSelectedTech(state, action: PayloadAction<Technology>) {
            state.selectedTech = action.payload;
        },
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGitHubProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGitHubProjects.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                localStorage.setItem('projects', JSON.stringify(state.items));
            })
            .addCase(fetchGitHubProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка при загрузке проектов';
            });
    },
});

export const {setProjects, addProject, setSelectedTech, resetError} = projectsSlice.actions;

export default projectsSlice.reducer;