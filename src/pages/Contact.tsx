import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <h1>Свяжитесь со мной</h1>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Ваше имя</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Ваша почта</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Введите ваш email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Сообщение</label>
                    <textarea
                        id="message"
                        placeholder="Введите ваше сообщение"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Отправить</button>
            </form>
        </div>
    );
};

export default Contact;
