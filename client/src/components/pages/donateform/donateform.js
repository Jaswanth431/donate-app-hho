import React from 'react'
import MAIN from '../../utilities/main';
import './donateform.css';
import { useRef } from 'react';


const DONATEFORM = () => {

    const elementName = useRef();
    const elementEmail = useRef();
    const elementNumber = useRef();
    const elementAmount = useRef();

    // const isDate = (val)=> {
    //     // Cross realm comptatible
    //     return Object.prototype.toString.call(val) === '[object Date]'
    // }
      
    // const  isObj =(val)=> {
    //     return typeof val === 'object'
    // }
      
    // const stringifyValue =(val) =>{
    //     if (isObj(val) && !isDate(val)) {
    //         return JSON.stringify(val)
    //     } else {
    //         return val
    //     }
    // }
      
    // const buildForm = ({ action, params })=> {
    //     const form = document.createElement('form')
    //     form.setAttribute('method', 'post')
    //     form.setAttribute('action', action)
        
    //     Object.keys(params).forEach(key => {
    //         const input = document.createElement('input')
    //         input.setAttribute('type', 'hidden')
    //         input.setAttribute('name', key)
    //         input.setAttribute('value', stringifyValue(params[key]))
    //         form.appendChild(input)
    //     })
        
    //     return form
    // }
    
    // const  post = (details)=> {
    //     const form = buildForm(details)
    //     document.body.appendChild(form)
    //     form.submit()
    //     form.remove()
    // }
    

    // const makePayment = async ()=>{
    //     const name=elementName.current.value;
    //     const email=elementEmail.current.value;
    //     const number=elementNumber.current.value;
    //     const amount=elementAmount.current.value;

    //     const data={
    //             name:name,
    //             email:email,
    //             number:number,
    //             amount:amount
    //     };

    //     try{
    //         console.log(data);
    //         const checksumResponse = await fetch("http://localhost:5000/api/v1/payment",{
    //             method:"POST",
    //             headers:{
    //                 "Accept"    :"application/json",
    //                 "Content-Type":"application/json"
    //             },
    //             body:JSON.stringify(data)
    //         })
    //         const checksumParams = await checksumResponse.json();
    //         console.log(checksumParams);

    //         var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
    //         // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
    //         var information={
    //             action:txn_url,
    //             params:checksumParams
    //         }
    //         post(information)
    //     }catch(err){
    //         console.log(err);
    //     }
        
    // }
  
  return (

    <MAIN>
     <section className="row">
            <form className="form-box"  action="http://localhost:5000/paynow" method="post">
                <div className="element-box">
                    <label>Your Name:</label>
                    <input type="text" name="name" ref={elementName}/>
                </div> 
                <div className="element-box">
                    <label>Your email:</label>
                    <input type="text"  name="email" ref={elementEmail}/>
                </div>

                <div className="element-box">
                    <label>Moblie Number:</label>
                    <input type="text" name="number"  ref={elementNumber}/>
                </div>
                <div className="element-box">
                    <label>Amount:</label>
                    <input type="text" name="amount"  ref={elementAmount}/>
                </div>
                <div className="element-box">
                        <button className="donate-form-btn" >Pay Now</button>
                </div>
            </form>
        </section>
    </MAIN>
    
   
  )
}

export default DONATEFORM;