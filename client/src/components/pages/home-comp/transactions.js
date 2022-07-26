import React from 'react';
import './transactions.css';
import {ReactComponent as LOADINGRING } from '../../../resources/loadingring1.svg'

import { getDonationsReceived , getDonatedTo} from "../../../api";
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const TRANSACTIONS =(props)=>{
    const [donationsReceived, setData] = useState(null);
    const [donatedTo, setDonatedToData] = useState(null);


    const getData = async ()=>{
         let data1 = await getDonationsReceived();
         let data2  = await getDonatedTo();
         setData(data1);
         setDonatedToData(data2.body);
         props.getDataToOverview(data1, data2.body);
    }

    useEffect(()=>{
          getData();
    }, []);

    let donationsReceivedList = [];
    if(!!donationsReceived){
        donationsReceivedList = donationsReceived.map((item)=> <div key={item._id} className="recieved-transaction">
                                                        <div className="date">
                                                            <p className="day">{new Date(item.date).getDate()}</p>
                                                            <p className="month">{new Date(item.date).toLocaleString('en-us', { month: 'short' })}</p>
                                                            <p className="year"> {new Date(item.date).getFullYear()}</p>
                                                        </div>
                                                        <div className="info">
                                                            <p className="user">{item.name}&nbsp;  </p>
                                                            <p className="amount-green">{`+${item.amount}`}</p>
                                                        </div>
                                                    </div> );
    }

    let donationsToList = [];
    if(!!donatedTo){
        donationsToList = donatedTo.map((item)=><div  key={item._id} className="recieved-transaction">
        <div className="date">
            <p className="day">{new Date(item.date).getDate()}</p>
            <p className="month">{new Date(item.date).toLocaleString('en-us', { month: 'short' })}</p>
            <p className="year"> {new Date(item.date).getFullYear()}</p>
        </div>
        <div className="info">
            <p className="user">{item.name}&nbsp;  </p>
            <p className="amount-red">{`-${item.amount}`}</p>
            <a className="btn btn-special more-info-btn"  href={item.link} target="_blank">More</a>
        </div>
    </div> );
    }


    return (
        <section className="section-transactions row">
            <h1>Recent Transactions</h1>
            
            <div className="hr-line-1"></div>

            <div className="transaction-box">
                <div className="donation-recieved transaction-box-child">
                    <div className="trans-header-box">
                        <h3>
                    Donations recieved
                    </h3>
                    </div>
                    {!donationsReceived &&<div className="loading-box">
                       <LOADINGRING/>
                   </div>}

                   {!!donationsReceived && donationsReceivedList }
                </div>
                
                
                <div className="donation-spent transaction-box-child">
                    <div className="trans-header-box">
                        <h3>
                            Donated by HHO
                        </h3>
                    </div>
                    {!donatedTo &&<div className="loading-box">
                       <LOADINGRING/>
                   </div>}

                   {!!donatedTo && donationsToList }
                </div>
            </div>

       </section>
    );
}

export default TRANSACTIONS;