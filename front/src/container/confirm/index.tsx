import React, { useReducer } from "react";
import "./index.css";

import Page from "../../page";
import Header from "../../component/header";
import Button from "../../component/buttons";
import Alert from "../../component/alert-message";
import Field from "../../component/field";

import {validate, initialState, SET, reducer } from '../../util/form';
import { getTokenSession, saveSession } from "../../util/session";
import ArrowBack from "../../component/history-back";

interface ConfirmPage {
    children: React.ReactNode;
}

const Confirm: React.FC<ConfirmPage> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_CODE, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_CODE, payload: errorMessage });
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { code } = state;

        if (!code) {
            dispatch({ type: SET.SET_MESSAGE_CODE, payload: "Enter your code"});
            return;
        }

        const convertData = JSON.stringify({code, token: getTokenSession(), getInfo:window.navigator.userAgent})

        try {
            const res = await fetch("http://localhost:4000/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            })

            const data = await res.json()

            if (!res.ok && data.field === "data") {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (res.ok) {
                saveSession(data.session)
                window.location.assign("/balance")
            }
        } catch (e: any) {
            console.error(e.message)
        }
    }

    return (
        <Page>
            <section className="confirm">
                <ArrowBack />
                <Header title="Confirm" text=""/>

                <form method="POST" onSubmit={handleSubmit}>
                    <Field label="Code" onInput={handleCodeInput} placeholder="Enter your code" alert={state.messageCode} type="text" value={state.code} style={{ borderColor: state.messageCode ? 'rgb(217, 43, 73)' : '' }}/>

                    <Button type="submit" className="primary">
                        Confirm
                    </Button>

                    <Alert className={`alert--warn ${state.messageData} disabled`}>
                        {state.messageData}
                    </Alert>
                </form>
            </section>
        </Page>
    )
}

export default Confirm;