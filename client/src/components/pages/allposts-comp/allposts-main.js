import React from "react";
import MAIN from "../../utilities/main";
import './allposts-main.css';
import calendersvg from '../../../resources/calender.svg';
const ALLPOSTS = ()=>{
    return (
        <MAIN>
             <section className="row">
                <div className="post-box">
                    
                    <div className="post-header-box">
                        <h1>This is the heading of the post</h1>
                        <p className="posted-date"><span><img src={calendersvg}/></span>Posted 2 years ago</p>
                    </div>
                    
                    <p className="post-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <a href="#" className="btn btn-special">Read more</a>
                </div>
                <div className="post-box">
                    
                    <div className="post-header-box">
                        <h1>This is the heading of the post</h1>
                        <p className="posted-date"><span><img src={calendersvg}/></span>Posted 2 years ago</p>
                    </div>
                    
                    <p className="post-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ni
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ni Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ni
                    </p>
                    <a href="#" className="btn btn-special">Read more</a>
                </div>
                <div className="post-box">
                    
                    <div className="post-header-box">
                        <h1>This is the heading of the post</h1>
                        <p className="posted-date"><span><img src={calendersvg}/></span>Posted 2 years ago</p>
                    </div>
                    
                    <p className="post-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <a href="#" className="btn btn-special">Read more</a>
                </div>
             </section>
        </MAIN>
    );
}

export default ALLPOSTS ; 