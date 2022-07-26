import React, {useRef, useState} from 'react'
import {useDispatch, } from 'react-redux';
import MAIN from "../../utilities/main";
import './adminlogin.css';
import {verifyLogin, checkLoggedIn} from '../../../api/index';
import {loggedIn} from '../../../actions/index';
import { useNavigate } from "react-router-dom";

const ADMINLOGIN = () => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const postData = async (data)=>{
        setError("");
        const response = await verifyLogin(data);
        if(response.status === 'success'){
            const response = await checkLoggedIn();
            if(response.isLoggedIn){
                dispatch(loggedIn());
                navigate(`/`); 
            }else{
              setError('Your are not Logged in');
            }
        }else if(response.status === 'failure'){
            setError(response.message);
        }
        
    }

    const submitPost = () => {

    
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value;
  
  
        if(!username){
          usernameRef.current.focus();
          return;
        }
        if(!password){
          passwordRef.current.focus();
          return;
        }
        postData({username, password} );
    };


  return (
    <MAIN>
    <section className="row section-login">
        <div className="login-box">
        <h3 className='login-box-heading'><u>Login</u></h3>
        {error && <div className='error-box error'><p>{error}</p></div>}
        <div className="input-box">
            <input className="input-username"  type="text" ref={usernameRef} placeholder='Enter Username :' />

        </div>
        <div className="input-box">
             <input className="input-password" ref={passwordRef} type="password" placeholder='Enter Password :' />
            
        </div>
       
        <div className="input-box">
          <button onClick={submitPost} className="btn-donatedto">Add Post</button>
            
        </div>
    </div>
</section>
</MAIN>
  )
}

export default ADMINLOGIN
