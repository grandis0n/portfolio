import { Project } from '../types/Project';

export const projectsData: Project[] = [
    {
        id: '1',
        title: 'FEFU do',
        description: 'ToDo application',
        technologies: ['Dart', 'Swift'],
        link: 'https://github.com/grandis0n/FEFUdo'
    },
    {
        id: '2',
        title: 'businessCard',
        description: 'This website serves as a business card for Ilya Bizimov. Here, you\'ll find essential contact information and links to social media profiles.',
        technologies: ['CSS', 'HTML'],
        link: 'https://github.com/grandis0n/businessCard'
    },
    {
        id: '3',
        title: '2048',
        description: 'Это простая реализация популярной игры 2048 с использованием HTML, CSS и JavaScript.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/grandis0n/2048'
    }
];
