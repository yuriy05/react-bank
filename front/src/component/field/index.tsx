import React from "react";
import "./index.css"

interface InputField {
    label ?: string,
    type: string,
    placeholder ?: string,
    name ?: string,
    ClassName ?: string,
}

const Field: React.FC<InputField> = ({label, type, placeholder, name, ClassName}) => {
    return (
        <div className="field">
            <label className="field__label">{label}</label>
            <input className="field__input" type={type} placeholder={placeholder} name={name}/>
        </div>
    )
}

export default Field