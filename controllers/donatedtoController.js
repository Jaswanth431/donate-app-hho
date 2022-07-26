const DonateToModel = require('../models/donatedtoModel');

exports.addDonatedTo=async (req, res)=>{
     const data = req.body;
     await DonateToModel.create(data);
     res.status(200).json({status:'ok'});
}

exports.getAllDonatedTo=async (req, res)=>{
    const docs = await DonateToModel.find().sort({date:-1});
    res.status(200).json({status:'ok', body:docs});
}