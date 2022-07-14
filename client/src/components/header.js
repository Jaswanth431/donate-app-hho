import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const HEADER = ()=>{
    return (
        <header className="header">
            <nav className="nav"> 
                <div className="nav-box">
                    <div className="logo-box">
                        <h1 className="logo-heading-1"> HHO</h1>
                        <h1 className = "logo-heading-2">RGUKT-ONGOLE</h1>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li><Link className="nav-link" to="/posts">Posts</Link></li>
                            <li><Link className="nav-link" to="/">Account</Link></li>
                            <li><Link className="nav-link" to="#">Events</Link></li>
                            <li><Link className="nav-link" to="#">Our Team</Link></li>
                            <li><Link className="nav-link" to="#">About us</Link></li>
                            <li><Link className="nav-link nav-link-special" to="/donate">Donate</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
    </header>
    );
}

export default HEADER;