import React from 'react';
import './transactions.css';

const TRANSACTIONS =()=>{
    return (
        <section className="section-transactions row">
            <h1>Recent Transactions</h1>
            <div className="hr-line-1"></div>

            <div className="transaction-box">
                <div className="donation-recieved">
                    <div className="trans-header-box">
                        <h3>
                    Donations recieved
                    </h3>
                    </div>
                    <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Jan</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user">Jeevan Kalyan &nbsp;  </p>
                            <p className="amount-green">+1000</p>

                        </div>
                    </div>
                    <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Jan</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user">Jadda Jasawnth kumar &nbsp;  </p>
                            <p className="amount-green">+2300</p>

                        </div>
                    </div>
                    <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Jan</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user">Garikina suresh &nbsp;  </p>
                            <p className="amount-green">+10</p>

                        </div>
                    </div>
                
                </div>
                <div className="donation-spent">
                    <div className="trans-header-box">
                    <h3>
                        Donated by HHO
                    </h3>
                    </div>
                    <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Jan</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user">Jeevan Kalyan &nbsp;  </p>
                            <p className="amount-red">-1000</p>
                            <a className="btn btn-special more-info-btn"  href="#" target="_blank">More info</a>
                        </div>
                    </div>
                    <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Mar</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user">Ajay Kalyan &nbsp;  </p>
                            <p className="amount-red">-200000.0</p>
                            <a className="btn btn-special more-info-btn"  href="#" target="_blank">More info</a>
                        </div>
                    </div>  <div className="recieved-transaction">
                        <div className="date">
                            <p className="day">09</p>
                            <p className="month">Jan</p>
                            <p className="year"> 2022</p>
                        </div>
                        <div className="info">
                            <p className="user"> Nagababu &nbsp;  </p>
                            <p className="amount-red">-2457</p>
                            <a className="btn btn-special more-info-btn"  href="#" target="_blank">More info</a>
                        </div>
                    </div>
                </div>
            </div>

       </section>
    );
}

export default TRANSACTIONS;