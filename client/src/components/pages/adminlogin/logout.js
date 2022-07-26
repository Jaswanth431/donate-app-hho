import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import MAIN from "../../utilities/main";
import './adminlogin.css';
import { logoutApi } from "../../../api";
import { loggedOut } from "../../../actions";

const LOGOUT = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   
  const logoutHandler = async ()=>{
    const response = await logoutApi();
    if(response.status === "success"){
        dispatch(loggedOut());
        navigate('/');
    }
  }

  logoutHandler();

  return (
    <MAIN>
        <section className="row">
            <div class="logout-box">
                <h1>Logging you out.....</h1>
            </div>
        </section>
    </MAIN>
  )
}

export default LOGOUT