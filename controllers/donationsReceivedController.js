const PaymentsModel  = require('../models/paymentsModel');

exports.getAllReceivedDonations = async (req, res)=>{
        const payments = await PaymentsModel.find({paymentStatus:'success'}, 'name date amount').sort({date:-1});
        res.status(200).json({ body:payments});
}