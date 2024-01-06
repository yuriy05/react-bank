import React from "react";
import "./index.css"

interface ButtonProps {
    children: React.ReactNode;
    className ?: string;
    type ?: "sumbit" | "reset" | "button";
    onClick ?: () => void;
}

const Button: React.FC<ButtonProps> = ({children, className = "", onClick, type = "button" }) => {
    return (
        <button className={`button button--${className}`} onClick={onClick} type="button">
            {children}
        </button>
    )
}

export default Button;