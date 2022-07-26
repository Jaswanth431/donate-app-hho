import React, {useState} from "react";
import MAIN from "../../utilities/main";
import OVERVIEW from "./overview";
import TRANSACTIONS from "./transactions";


const HOMEMAIN = ()=>{
    const [receivedMoney, setReceived] = useState(0);
    const [spentMoney, setSpent] = useState(0);
    const [remainingMoney, setRemaining] = useState(0);

    const overviewData = (moneyReceived, moneySpent) =>{
        
            let donationReceived = 0;
            let donationSpent = 0;

            moneyReceived.forEach(item=>{
                donationReceived+=item.amount;
            })
            moneySpent.forEach(item=>{
                donationSpent+=item.amount;
            })

            setReceived(donationReceived);
            setSpent(donationSpent);
            setRemaining(donationReceived-donationSpent);
    }
    return (
        <MAIN>
            <OVERVIEW  receivedMoney = {receivedMoney} spentMoney = { spentMoney} remainingMoney={remainingMoney}/>
            <TRANSACTIONS getDataToOverview = {overviewData}/>
        </MAIN>
    );
}

export default HOMEMAIN;