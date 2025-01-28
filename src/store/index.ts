import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const ALL_TECHNOLOGIES = 'All';

const getStoredProjects = () => {
    try {
        const storedProjects = localStorage.getItem('projects');
        return storedProjects ? JSON.parse(storedProjects) : [];
    } catch (error) {
        console.error('Error parsing projects from localStorage:', error);
        return [];
    }
};

const preloadedState = {
    projects: {
        items: getStoredProjects(),
        selectedTech: ALL_TECHNOLOGIES,
        loading: false,
        error: null,
    },
};

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;