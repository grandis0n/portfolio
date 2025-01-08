import React from 'react';
import '../styles/Skills.css';
import { FaPython, FaCss3Alt, FaGit, FaCogs} from 'react-icons/fa';

const skills = [
    { name: 'С++', level: 75, icon: <FaCogs />},
    { name: 'Python', level: 85, icon: <FaPython />},
    { name: '1C', level: 60 },
    { name: 'html, css', level: 70, icon: <FaCss3Alt /> },
    { name: 'Git', level: 90, icon: <FaGit /> }
];

const Skills: React.FC = () => {
    return (
        <div className="skills-container">
            <h1>Мои навыки</h1>
            <div className="skills">
                {skills.map((skill) => (
                    <div key={skill.name} className="skill">
                        <div className="skill-circle">
                            <svg width="120" height="120" viewBox="0 0 120 120" className="circle-chart">
                                <circle cx="60" cy="60" r="50" className="circle-background"/>
                                <circle cx="60" cy="60" r="50" className="circle-progress"
                                        strokeDasharray={`${skill.level * 3.14}, 314`}/>
                                <text x="50%" y="50%" dy=".3em" textAnchor="middle"
                                      className="circle-text">{skill.level}%</text>
                            </svg>
                        </div>
                        <div className="skill-header">
                            <div className="skill-icon">{skill.icon}</div>
                            <h3>{skill.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;