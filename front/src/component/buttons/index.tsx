import React from "react";
import "./index.css"

interface ButtonProps {
    text: string;
    className ?: string;
    onClick ?: () => void;
}

const Button: React.FC<ButtonProps> = ({text, className = "", onClick }) => {
    return (
        <button className={`button button--${className}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;