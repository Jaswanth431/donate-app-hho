import React from "react";
import MAIN from "../../utilities/main";
import {useParams } from 'react-router-dom';
import { getOrderStatus } from "../../../api";
import {useState, useEffect} from 'react';
import './paymentstatus.css';


const PAYMENTSTATUS = ()=>{
    const {orderid} = useParams();
    const [orderData, setData] = useState(null);

    const getData = async ()=>{
         let orderStatus = await getOrderStatus(orderid);
         setData(orderStatus);
    }
     
    useEffect(()=>{
          getData();
    }, []);

    return (
        <MAIN>
             <section className="row section-trans-details">
                   {!orderData && (<div className='details-box'><h1>Details are loading...</h1></div>)}
                   {!!orderData && orderData.resultInfo.resultStatus === 'TXN_SUCCESS' && (<div className="details-box">
                    <h1>Transaction Successfull</h1>
                    <table>
                      <tbody>
                      <tr>
                      <td>Transaction Status</td>
                      <td>{orderData.resultInfo.resultMsg}</td>
                    </tr>
                    <tr>
                      <td>Order Id</td>
                      <td>{orderData.orderId}</td>
                    </tr>
                    <tr>
                      <td>Transaction ID</td>
                      <td>{orderData.txnId}</td>
                    </tr>
                    <tr>
                      <td>Bank Transaction Id</td>
                      <td>{orderData.bankTxnId}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{orderData.txnAmount}</td>
                    </tr>
                    <tr>
                      <td>Date and time</td>
                      <td>{orderData.txnDate}</td>
                    </tr>
                    </tbody>
                                  
                    </table>
                    </div>)}
                   {!!orderData && orderData.resultInfo.resultStatus === 'TXN_FAILURE' && (<div className="details-box">
                    <h1>Transaction Failed </h1>
                    <table>
                      <tbody>
                      <tr>
                      
                      <td>Transaction Status</td>
                      <td>{orderData.resultInfo.resultStatus}</td>
                    </tr>
                      <tr>

                      <td>Transaction Message</td>
                      <td>{orderData.resultInfo.resultMsg}</td>
                    </tr>
                    <tr>
                      <td>Order Id</td>
                      <td>{orderData.orderId}</td>
                    </tr>
                    </tbody>
                                  
                    </table>
                    </div>)}
             </section>
        </MAIN>
    );
}

export default PAYMENTSTATUS ; 