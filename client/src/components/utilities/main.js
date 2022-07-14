import React from 'react';
import './main.css'
const MAIN = (props)=>{
    return (
        <main className="main">
            {props.children}
        </main>
   )
}

export default MAIN;