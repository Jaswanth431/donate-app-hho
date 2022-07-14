import React from "react";
import MAIN from "../../utilities/main";
import OVERVIEW from "./overview";
import TRANSACTIONS from "./transactions";

const HOMEMAIN = ()=>{
    return (
        <MAIN>
            <OVERVIEW/>
            <TRANSACTIONS/>
        </MAIN>
    );
}

export default HOMEMAIN;