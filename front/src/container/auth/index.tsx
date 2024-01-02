import React from "react";

interface AuthProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}

export default AuthRoute;