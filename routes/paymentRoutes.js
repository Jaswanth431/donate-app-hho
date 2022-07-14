const express = require('express');
const Paytm = require('paytmchecksum');
const {v4:uuidv4}=require('uuid')
const router = express.Router();

router.post("/",(req, res) => {
        // Route for making payment
        // console.log(req.body); 
    //   console.log("hii");
     const paymentDetails = {
          amount: req.body.amount,
          customerId: req.body.name,
          customerEmail: req.body.email,
          customerPhone: req.body.number
      }
      if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
          res.status(400).send('Payment failed')
      } else {
          var params = {};
          params['MID'] = process.env.MERCHANT_ID;
          params['WEBSITE'] = process.env.WEBSITE;
          params['CHANNEL_ID'] = 'WEB';
          params['INDUSTRY_TYPE_ID'] = 'Retail';
          params['ORDER_ID'] = uuidv4();
          params['CUST_ID'] = paymentDetails.customerId;
          params['TXN_AMOUNT'] = paymentDetails.amount;
          params['CALLBACK_URL'] = 'http://localhost:5000/callback';
          params['EMAIL'] = paymentDetails.customerEmail;
          params['MOBILE_NO'] = paymentDetails.customerPhone;
      
          console.log(params);
          /**
            * Generate checksum by parameters we have
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            var paytmChecksum = Paytm.generateSignature(params, process.env.MERCHANT_KEY);
            paytmChecksum.then(checksum=>{
                let paytmParams={
                    ...params,
                    "CHECKSUMHASH":checksum
                }
                res.json(paytmParams)

            }).catch(error=>console.log(error));
      }
});

module.exports = router;