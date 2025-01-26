import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    try {
        localStorage.setItem('projects', JSON.stringify(state.projects.items));
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }

    return result;
};

export default localStorageMiddleware;
