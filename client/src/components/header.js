import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import {useSelector} from 'react-redux';
const HEADER = ()=>{
    const isLoggedIn = useSelector(state=>state.isLoggedIn);
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHandler = ()=>{
        setToggleMenu(!toggleMenu);
    }

    // console.log(isLoggedIn);

    return (
        <header className="header">
            <nav className="nav"> 
                <div className="nav-box">
                    <div className="logo-box">
                        <h1 className="logo-heading-1"> HHO</h1>
                        <h1 className = "logo-heading-2">RGUKT-ONGOLE</h1>
                    </div>
                    <div className="navigation">
                        <div className="toggle-menu"  onClick={toggleMenuHandler}>
                            <span className={toggleMenu? 'line line1 add-line1' : 'line line1'}></span>
                            <span className={toggleMenu? 'line line2 add-line2' : 'line line2'}></span>
                            <span className={toggleMenu? 'line line3 add-line3' : 'line line3'}></span>
                        </div>
                        <ul className={toggleMenu? 'main-navigation slidein' : 'main-navigation'}>
                            <li><Link className="nav-link" to="/posts">Posts</Link></li>
                            <li><Link className="nav-link" to="/">Account</Link></li>
                            {/* <li><Link className="nav-link" to="#">Events</Link></li> */}
                            <li><Link className="nav-link" to="#">Our Team</Link></li>
                            <li><Link className="nav-link" to="#">About us</Link></li>
                            {!isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {isLoggedIn && <li className="dropdown-box">
                                <a href="#" className='nav-link dropdown-trigger'>Admin</a>
                                <ul className="dropdown-menu">
                                  <li><Link  to="/addpost" className='nav-link'>Add post</Link></li>
                                  <li><Link  to="/donatedto" className='nav-link'>Donate to</Link></li>
                                  <li><Link  to="/logout" className='nav-link'>Logout</Link></li>
                                </ul>
                            </li>}

                            <li><Link className="nav-link nav-link-special" to="/donate">Donate</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
    </header>
    );
}

export default HEADER; 