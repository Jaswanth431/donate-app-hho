const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User; 