const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const https = require('https')
const qs = require('querystring')
const {v4:uuidv4}=require('uuid')
const PaytmChecksum = require('paytmchecksum');
const paymentRouter = require('./routes/paymentRoutes');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('client/build'));
app.post('/paynow', (req, res)=>{
    const orderId = uuidv4();

  
        let data = req.body;

        const paytmParams = {}
        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.MERCHANT_ID,
            "websiteName": process.env.WEBSITE,
            "orderId": orderId,
            "callbackUrl": "http://localhost:5000/callback",
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

                post_res.on('end', function () {
                    response = JSON.parse(response)
                    console.log('txnToken:', response);

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
});
app.post('/callback', (req, res)=>{
   
        let data =req.body;
        console.log(data);
        data = JSON.parse(JSON.stringify(data))
        const paytmChecksum = data.CHECKSUMHASH

        let isVerifySignature = PaytmChecksum.verifySignature(data, process.env.MERCHANT_KEY, paytmChecksum)
        if (isVerifySignature) {
            console.log("Checksum Matched");

            var paytmParams = {};

            paytmParams.body = {
                "mid": process.env.MERCHANT_ID,
                "orderId": data.ORDERID,
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

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        res.write(response)
                        res.end()
                    });
                });

                // post the data
                post_req.write(post_data);
                post_req.end();
            });
        } else {
            console.log("Invalid Transaction");
        }
    
});


app.use('/api/v1/payment',paymentRouter );

app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

module.exports = app;