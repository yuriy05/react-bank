import React from "react";
import "./index.css";

import Page from "../../page";

interface BalancePageProps {
    children: React.ReactNode;
}

const BalancePage: React.FC<BalancePageProps> = () => {
    return(
        <Page>
            <h1 style={{textAlign:"center", margin: "20px 0 0 0"}}>Balance page</h1>
        </Page>
    )
}

export default BalancePage;