import React, {Suspense, useEffect} from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PAGELOADING from './components/pages/pageloading/pageloading';
import HEADER from './components/header';
import FOOTER from './components/footer';
import { loggedIn } from './actions';
import { checkLoggedIn } from './api';

const HOMEMAIN = React.lazy(()=>import('./components/pages/home-comp/home-main'));
const ALLPOSTS = React.lazy(()=>import('./components/pages/allposts-comp/allposts-main'));
const POST = React.lazy(()=>import('./components/pages/allposts-comp/post'));
const DONATEFORM = React.lazy(()=>import('./components/pages/donateform/donateform'));
const PAGENOTFOUND = React.lazy(()=>import('./components/pages/pagenotfound/pagenotfound'));
const PAYMENTSTATUS = React.lazy(()=>import('./components/pages/paymentstatus/paymentstatus'));
const ADDPOST = React.lazy(()=>import('./components/pages/addpost/addpost'));
const DONATEDTO = React.lazy(()=>import('./components/pages/donatedto/donatedto'));
const ADMINLOGIN = React.lazy(()=>import('./components/pages/adminlogin/adminlogin'));
const LOGOUT = React.lazy(()=>import('./components/pages/adminlogin/logout'));

const App = () => {
    const dispatch = useDispatch();
    const getLoginStatus = async ()=>{
            const response = await checkLoggedIn();
            if(response.isLoggedIn)dispatch(loggedIn());
    }
    getLoginStatus();
    
    useEffect(() => {
        document.title = 'HHO RGUKT-ONGOLE';
    });
    return (
        <BrowserRouter>
           <HEADER/>
           <Suspense fallback={<PAGELOADING/>}>
                <Routes>
                    <Route path="/" element ={<HOMEMAIN/>}/>
                    <Route path="/posts" element = {<ALLPOSTS/>} />
                    <Route path="/loading" element = {<PAGELOADING/>} />
                    <Route path="/posts/:postid" element={<POST/>}/>
                    <Route path="/donate" element = {<DONATEFORM/>}/>
                    <Route path="/donatedto" element = {<DONATEDTO/>}/>
                    <Route path="/addpost" element = {<ADDPOST/>}/>
                    <Route path="/login" element={<ADMINLOGIN/>}/>
                    <Route path="/logout" element={<LOGOUT/>}/>

                    <Route path="/paymentstatus/:orderid" element = {<PAYMENTSTATUS/>}/>
                    <Route path="*" element={<PAGENOTFOUND/>}/>
                </Routes>
            </Suspense>
            <FOOTER/>
        </BrowserRouter>
        );
}

export default App;
