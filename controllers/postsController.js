const PostsModel  = require('../models/postModel');

exports.createPostHandler = async(req,res)=>{
    await PostsModel.create({heading:req.body.heading, body:req.body.postBody, url:req.body.url});
    res.status(200).json();
}


exports.getPostByTitleHandler = async(req,res)=>{
    const docs = await PostsModel.find({url:req.params.postid});
    // console.log(docs);
    const response = {status:"ok", size:docs.length, docs};
    res.status(200).json(response);
}

exports.getAllPostsHandler = async(req,res)=>{
    const docs = await PostsModel.find().sort({date:-1});
    const response = {status:"ok", size:docs.length, docs};
    res.status(200).json(response);
}



