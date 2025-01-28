import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';
import { getGitHubProjects } from '../services/githubService';
import { ALL_TECHNOLOGIES, TECHNOLOGIES_LIST } from '../constants/technologies';

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

export const fetchGitHubProjects = createAsyncThunk<Project[], string>(
    'projects/fetchGitHubProjects',
    async (username: string) => {
        const repos = await getGitHubProjects(username);

        return repos.map((repo) => ({
            id: repo.id.toString(),
            title: repo.name,
            description: repo.description || 'Нет описания',
            link: repo.html_url,
            technologies: repo.language ? [repo.language] : [],
        }));
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
                state.error = action.error.message || 'Ошибка при загрузке проектов';
            });
    },
});

export const { setProjects, addProject, setSelectedTech, resetError } = projectsSlice.actions;

export default projectsSlice.reducer;