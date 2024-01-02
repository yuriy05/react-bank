import React from "react";
import Page from "../../page/index";

import "./index.css"
import Button from "../../component/buttons";

const WelcomePage: React.FC = () => {
    return (
        <Page>
            <section className="welcome">
                <div className="welcome__background">
                    {/* Фоновий контейнер */}
                    <div className="welcome__info">
                        <h1 className="welcome__title">Hello!</h1>
                        <p className="welcome__text">Welcome to bank app</p>
                    </div>
                    <div className="welcome__image-container">
                        {/* Контейнер для картинки посередині */}
                        <img src="/img/bitcoin.png" alt="Welcome" className="welcome__image" />
                    </div>
                </div>
                <div className="welcome__buttons">
                    {/* Контейнер для кнопок без фону */}
                    <Button text="Sign up" className="primary" />
                    <Button text="Sign in" className="secondary" />
                </div>
            </section>
        </Page>
    )
}

export default WelcomePage;