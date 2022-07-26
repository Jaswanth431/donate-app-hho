const express = require('express');
const router = express.Router();
const paymentController = require('./../controllers/paymentsController');


router.post('/paynow',paymentController.paynowHandler);
router.post('/callback', paymentController.callbackHandler);
router.get('/paymentstatus/:orderid', paymentController.paymentStatusHandler);

module.exports = router;