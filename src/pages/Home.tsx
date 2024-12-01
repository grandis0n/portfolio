import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="profile-container">
                <img src="/assets/images/profile.jpg" alt="Профиль" className="profile-img" />
                <h1 className="name">Илья Бизимов</h1>
                <p className="tagline">Портфолио</p>
            </div>
            <div className="welcome-message">
                <p>Добро пожаловать в мое портфолио! Здесь вы найдете информацию обо мне, моих проектах и навыках.</p>
            </div>
        </div>
    );
};

export default Home;
