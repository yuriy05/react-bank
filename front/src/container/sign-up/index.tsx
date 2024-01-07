import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"

import Page from "../../page/index";
import Header from "../../component/header"
import ArrowBack from "../../component/history-back";
import Button from "../../component/buttons";
import Field from "../../component/field";
import Alert from "../../component/alert-message";

import { saveSession } from "../../util/session";
import {validate, reducer, initialState, SET} from "../../util/form"


interface SignUpPage {
    children: React.ReactNode;
}

const SignUp: React.FC<SignUpPage> = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value, "email");
        dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_EMAIL, payload: errorMessage})
    }

    const handlePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value, "password");
        dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_PASSWORD, payload: errorMessage})
    }

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = state;

        const emailError = validate(email, "email");
        const passwordError = validate(password, "password");

        if ( emailError || passwordError ) {
            dispatch({type: SET.SET_MESSAGE_DATA, payload: "Fix error before action"});
            return;
        }
        const convertData = JSON.stringify({email, password})

        try {
            const res = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
        })

        const data = await res.json()

        if (!res.ok && data.field === "data") {
            dispatch({type: SET.SET_MESSAGE_DATA, payload: data.message })
            return;
        } else if (!res.ok && data.field === "email") {
            dispatch({ type: SET.SET_MESSAGE_EMAIL, payload: data.message });
            return;
        } else if (res.ok) {
            saveSession(data.initSession);
            window.location.assign("/signup-confirm");
        }
        } catch(err: any) {
            console.error(err.message)
        }
    }

    const handlePassVisibility = () => {
        dispatch({ type: SET.TOGGLE_VISIBILITY})
    }

    return (
        <Page>
           <section className="registration">
                <ArrowBack />

                <Header title="Sign Up" text="Choose a registration method" />

                <form className="registration__form" method="POST" onSubmit={handleSubmit}>
                    <Field label="Email" type="email" placeholder="Enter your email" name="email" onInput={handleEmailField} value={state.email} alert={state.messageE}/>
                    <Field label="Password" type="password" placeholder="Enter your password" name="password" onInput={handlePasswordField} value={state.password} showPass={state.showPass} onPassVisibility={handlePassVisibility} alert={state.messageP}/>

                    <p className="registration__text">Already have an account? <span className="registration__text registration__text--purple">
                        <Link to="/signin">
                            Sign In
                        </Link>
                        </span>
                    </p>

                    <Button type="submit" className="primary" > Continue </Button>

                    <Alert className={`alert--warn ${state.messageData} disabled`}>
                        {state.messageData}
                    </Alert>
                </form>
           </section>
        </Page>
    )
}

export default SignUp;