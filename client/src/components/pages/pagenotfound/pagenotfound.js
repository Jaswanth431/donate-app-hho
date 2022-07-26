import React from "react";
import MAIN from "../../utilities/main";
import './pagenotfound.css';
import {useLocation} from 'react-router';

const PAGENOTFOUND = ()=>{
    
    const search = useLocation().search;
    let name = new URLSearchParams(search).get('error');
    if(!name)name="The page you are looking for does not exist";

    return (
        <MAIN>
             <section className="row">
                 <div className="errorpage-box">
                    <h1>{name}</h1>
                 </div>
             </section>
        </MAIN>
    );
}

export default PAGENOTFOUND ; 