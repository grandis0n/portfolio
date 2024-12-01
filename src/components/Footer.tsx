import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>2024</p>
                <div className="social-links">
                    <a href="https://github.com/grandis0n/portfolio" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
