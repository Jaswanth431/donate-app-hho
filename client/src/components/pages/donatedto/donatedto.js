import React, {useRef} from 'react'
import MAIN from "../../utilities/main";
import './donatedto.css';
import {addDonatedTo} from '../../../api/index';
import { useNavigate } from "react-router-dom";
import PRIVATEROUTE from '../../utilities/privateroute';




const DONATEDTO = () => {

    const linkRef = useRef(null);
    const nameRef = useRef(null);
    const amountRef = useRef(null);

    const navigate = useNavigate();


    const postData = async ( data)=>{
        await addDonatedTo(data);
        navigate(`/`);  
    }

  const submitPost = () => {

    
      const name = nameRef.current.value.trim();
      const link = linkRef.current.value.trim();
      const amount = amountRef.current.value.trim();


      if(!name){
        nameRef.current.focus();
        return;
      }
      if(!link){
        linkRef.current.focus();
        return;
      }

      if(!amount){
        amountRef.current.focus();
        return;
      }

      postData({name, link, amount} );

  };
  return (
 
    <PRIVATEROUTE>
    <MAIN>
    <section className="row section-donatedto">
        <div className="donatedto-box">
        <div className="input-box">
            <input className="input-name"  type="text" ref={nameRef} placeholder='Enter name :' />

        </div>
        <div className="input-box">
             <input className="input-link" ref={linkRef} type="text" placeholder='Enter Link to the post :' />
            
        </div>
        <div className="input-box">
             <input className="input-amount" ref={amountRef}  type="number" placeholder='Enter amount :' />
            
        </div>
        <div className="input-box">
          <button onClick={submitPost} className="btn-donatedto">Add Post</button>
            
        </div>
    </div>
</section>
</MAIN>
</PRIVATEROUTE>
  )
}

export default DONATEDTO