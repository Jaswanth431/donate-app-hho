const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');



exports.verifyLogin = async (req, res)=>{
    const { username, password } = req.body;
  
    const user = await userModel.findOne({ username });
  
    if(!user){
        res.status(401).json({
            status:'failure',
            message:'Invalid login details!!'
        });
        return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        res.status(401).json({
            status:'failure',
            message:'Invalid login details!!'
        });
        return;
    }
    
    createSendToken(user, 200, res);
} 

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

exports.signup = async (req, res) => {

    const password =  await bcrypt.hash(req.body.password, 12);
    const newUser = await userModel.create({
      username: req.body.username,
      password:password
    });
  
    createSendToken(newUser, 201, res);
}

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};


exports.protect = async(req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
   if (req.cookies.jwt) {
    token = req.cookies.jwt;
   }

  if (!token) {
     res.status(401).json({
      status:'error',
      message:'Your are not logged in!!'
     });
     return;
  }

  // 2) Verification token
  try{
     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  }catch(err){
    res.status(401).json({
      status:'error',
      message:'Your are not logged in!!'
     });
     return;
  }
  next();
}

exports.isUserLoggedIn = async (req,res)=>{

    let token;
    if(req.cookies.jwt){
         token = req.cookies.jwt;
    }
 
    if (!token) {
      res.status(200).json({
        isLoggedIn:false
      });
      return;
    }

    // 2) Verification token
    try{
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    }catch(err){
      res.status(200).json({
        isLoggedIn:false
      });
      return;
    }

    res.status(200).json({
      isLoggedIn:true
    });
}

 