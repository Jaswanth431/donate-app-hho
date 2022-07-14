import React from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import HOMEMAIN from './components/pages/home-comp/home-main';
import ALLPOSTS from  './components/pages/allposts-comp/allposts-main';
import POST from './components/pages/allposts-comp/post';
import DONATEFORM from './components/pages/donateform/donateform';
import HEADER from './components/header';
import FOOTER from './components/footer';

const App = () => {
    return (
        <BrowserRouter>
           <HEADER/>
            <Routes>
                <Route path="/" element ={<HOMEMAIN/>}/>
                <Route path="/posts" element = {<ALLPOSTS/>} />
                <Route path="/posts/:postid" element={<POST/>}/>
                <Route path="/donate" element = {<DONATEFORM/>}/>
            </Routes>
            <FOOTER/>
        </BrowserRouter>

       
        );
}

export default App;
