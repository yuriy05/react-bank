import React from "react";
import Page from "../../page/index";
import { Link } from "react-router-dom";

import "./index.css"
import Button from "../../component/buttons";

const WelcomePage: React.FC = () => {
    return (
        <Page>
            <section className="welcome">
                {/* Фоновий контейнер */}
                <div className="welcome__background">
                    <div className="welcome__info">
                        <h1 className="welcome__title">Hello!</h1>
                        <p className="welcome__text">Welcome to bank app</p>
                    </div>
                    <div className="welcome__image-container">
                        {/* Картинка по середині */}
                        <img src="/img/bitcoin.png" alt="Welcome" className="welcome__image" />
                    </div>
                </div>
                <div className="welcome__buttons">
                    {/* Контейнер для кнопок без фону */}
                    <Link to="/signup">
                        <Button text="Sign up" className="primary" />
                    </Link>
                    <Link to="/signin">
                        <Button text="Sign in" className="secondary" />
                    </Link>
                </div>
            </section>
        </Page>
    )
}

export default WelcomePage;