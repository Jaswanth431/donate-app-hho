const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:[true, "Heading is required"]
    },
    body:{
        type:String,
        required:[true, "Post body is required"]
    }, 
    url:{
        type:String,
        required:[true, "url is required"]
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Posts = mongoose.model('posts', postsSchema);
module.exports = Posts;
