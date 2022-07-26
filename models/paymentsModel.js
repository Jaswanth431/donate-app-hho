const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"]
    }, 
    phone:{
        type:Number,
        required:[true, "Phone number is requred"]
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"]
    },
    orderid:{
        type:String,
        required:[true]
    },
    paymentStatus:{
        type:String,
        required:[true]
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Payments = mongoose.model('payments', paymentSchema);
module.exports = Payments;
