import React, { useState } from "react";
import "./index.css";

import Page from "../../page";

interface BalancePageProps {
    children: React.ReactNode;
}

const BalancePage: React.FC<BalancePageProps> = () => {

    const [amount, setAmount] = useState(100);

    const handleClick = () => {
        setAmount((prevAmount) => prevAmount + 1);
    }

    return(
        <Page>
            <section className="balance">
                <div className="balance__heading">
                    <div className="balance__menu">
                        <img src="/svg/settings.svg" />
                        <p style={{fontSize: "16px", color: "white", fontFamily: "Jost", fontWeight: "400"}}>Main wallet</p>
                        <img onClick={handleClick} src="/svg/notifications.svg" />
                    </div>
                    <div className="balance__amount">
                        $ {amount}<span className="balance__amount-cent">.20</span>
                    </div>
                </div>
            </section>
        </Page>
    )
}

export default BalancePage;