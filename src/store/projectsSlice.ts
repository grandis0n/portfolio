import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';
import { ALL_TECHNOLOGIES, TECHNOLOGIES_LIST } from '../constants/technologies';

type Technology = typeof TECHNOLOGIES_LIST[number];

interface ProjectsState {
    items: Project[];
    selectedTech: Technology;
}

const initialState: ProjectsState = {
    items: [],
    selectedTech: ALL_TECHNOLOGIES,
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = [...action.payload];
        },
        addProject(state, action: PayloadAction<Project>) {
            state.items = [...state.items, action.payload];
        },
        setSelectedTech(state, action: PayloadAction<Technology>) {
            state.selectedTech = action.payload;
        },
    },
});

export const { setProjects, addProject, setSelectedTech } = projectsSlice.actions;

export default projectsSlice.reducer;
