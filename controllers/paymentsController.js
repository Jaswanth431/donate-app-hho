const http = require('http')
const https = require('https')
const {v4:uuidv4}=require('uuid')
const PaytmChecksum = require('paytmchecksum');
const PaymentsModel = require('./../models/paymentsModel');

exports.paynowHandler =  async (req, res)=>{

    const orderId = uuidv4();
    let data = req.body;
    data.phone *=1;
    data.amount*=1;
    const paytmParams = {}
    paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.MERCHANT_ID,
        "websiteName": process.env.WEBSITE,
        "orderId": orderId,
        //http://localhost:5000/payments/callback in development
        "callbackUrl": "https://helpinghandsorganization.herokuapp.com/payments/callback",
        "txnAmount": {
            "value": data.amount,
            "currency": "INR",
        },
        "userInfo": {
            "custId": data.email,
            "custName":data.name,
            "custPhone": data.number

        },
    };

    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),process.env.MERCHANT_KEY).then(function (checksum) {

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.MERCHANT_ID}&orderId=${orderId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end', async function () {
                response = JSON.parse(response)

                try{
                    const doc = await PaymentsModel.create({
                        name:data.name,
                        email:data.email,
                        phone:data.number,
                        amount:data.amount,
                        orderid:orderId,
                        paymentStatus:"pending"
                    });
                }catch(err){
                    res.send("Request failed, tryafter some time");
                    console.log(err);
                }
                

                // console.log("insert successfull");
                
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(`<html>
                    <head>
                        <title>Show Payment Page</title>
                    </head>
                    <body>
                        <center>
                            <h1>Please do not refresh this page...</h1>
                        </center>
                        <form method="post" action="https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${process.env.MERCHANT_ID}&orderId=${orderId}" name="paytm">
                                <table border="1">
                                <tbody>
                                    <input type="hidden" name="mid" value="${process.env.MERCHANT_ID}">
                                        <input type="hidden" name="orderId" value="${orderId}">
                                        <input type="hidden" name="txnToken" value="${response.body.txnToken}">
                                </tbody>
                            </table>
                                        <script type="text/javascript"> document.paytm.submit(); </script>
                        </form>
                    </body>
                    </html>`)
                res.end()
            });
        });

        post_req.write(post_data);
        post_req.end();
    });
}

exports.callbackHandler = (req, res)=>{
   
        let data =req.body;
        data = JSON.parse(JSON.stringify(data));
        const paytmChecksum = data.CHECKSUMHASH;

        let isVerifySignature = PaytmChecksum.verifySignature(data, process.env.MERCHANT_KEY, paytmChecksum)
        if (isVerifySignature) {
            var paytmParams = {};

            paytmParams.body = {
                "mid": process.env.MERCHANT_ID,
                "orderId":data.ORDERID
            };

            PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MERCHANT_KEY).then(function (checksum) {
                paytmParams.head = {
                    "signature": checksum
                };

                var post_data = JSON.stringify(paytmParams);

                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: '/v3/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                // Set up the request
                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end',async function () {
                        
                        response =JSON.parse(response);
                        if(response.body.resultInfo.resultStatus == 'TXN_SUCCESS'){
                            const filter = {orderid: response.body.orderId};
                            const update = {paymentStatus:"success"};
                            try{
                               await PaymentsModel.findOneAndUpdate(filter, update);
                            }catch(err){
                                console.log(err);
                            }
                        }
                        else if(response.body.resultInfo.resultStatus == 'TXN_FAILURE'){
                            const filter = {orderid:response.body.orderId};
                            const update = {paymentStatus:"failed"};
                            try{
                               await PaymentsModel.findOneAndUpdate(filter, update);
                            }catch(err){
                                console.log(err);
                            }
                        }
                        res.redirect(`${process.env.FRONTENDURL}/paymentstatus/${response.body.orderId}`);
                        res.end()
                    });
                });

                // post the data
                post_req.write(post_data);
                post_req.end();
            });
        } else {
            res.send("Invalid Transaction");
        }
}

exports.paymentStatusHandler = (req,res)=>{

    const orderid = req.params.orderid;
    var paytmParams = {};
    paytmParams.body = {
        "mid": process.env.MERCHANT_ID,
        "orderId":orderid
    };

    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MERCHANT_KEY).then(function (checksum) {
        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: '/v3/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end',async function () {
                response =JSON.parse(response);
                console.log(response.body);
                res.status(200).json({body:response.body});
            });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
        });
}