import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';

interface ProjectsState {
    items: Project[];
    selectedTech: string;
}

const initialState: ProjectsState = {
    items: [],
    selectedTech: 'All',
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.items.push(action.payload);
        },
        setSelectedTech(state, action: PayloadAction<string>) {
            state.selectedTech = action.payload;
        },
    },
});

export const { setProjects, addProject, setSelectedTech } = projectsSlice.actions;

export default projectsSlice.reducer;
