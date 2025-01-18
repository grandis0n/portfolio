import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

const preloadedState = {
    projects: {
        items: JSON.parse(localStorage.getItem('projects') || '[]'),
        selectedTech: 'All',
    },
};

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    localStorage.setItem('projects', JSON.stringify(store.getState().projects.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
