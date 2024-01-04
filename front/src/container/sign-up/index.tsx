import React from "react";
import { Link } from "react-router-dom";
import Page from "../../page/index";

import "./index.css"
import ArrowBack from "../../component/history-back";
import Button from "../../component/buttons";
import Field from "../../component/field";

const SignUp: React.FC = () => {
    return (
        <Page>
           <section className="registration">
                <ArrowBack />
                <div className="registration__preview">
                    <h1 className="registration__title">
                        Sign Up
                    </h1>
                    <p className="registration__subtitle">
                        Choose a registration method
                    </p>
                </div>
                <form className="registration__form" method="POST">
                    <Field label="Email" type="email" placeholder="Enter your email" name="email"/>
                    <Field label="Password" type="password" placeholder="Enter your password" name="password"/>

                    <p className="registration__text">Already have an account? <span className="registration__text registration__text--purple">
                        <Link to="/signin">
                            Sign In
                        </Link>
                        </span>
                    </p>

                    <Button text="Continue" className="primary"/>

                </form>
           </section>
        </Page>
    )
}

export default SignUp;