const mongoose = require('mongoose');

const donatedToSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, 'Name is required']
    },
    link:{
        type:String,
        default: "#",
    },
    amount:{
        type:Number,
        required:[true, 'Amount is required']
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const DonateTo = mongoose.model('donatedto', donatedToSchema);
module.exports = DonateTo;
