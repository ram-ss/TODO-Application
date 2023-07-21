const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const {ErrorHandler} = require("../middlewares/error.js");
const jwt=require("jsonwebtoken");
require('dotenv').config();

exports.login=async (req,res,next)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("Invalid details",400));
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));
    // sendCookie(user,res,`Welcome back, ${user.name}`,200);
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    return res.cookie('token',token,{
      httpOnly: true,
      expiresIn:Date(Date.now()+3*24*60*60*1000),
    }).status(200).json({
      success: true,
      message:"login success",
      data:user,
      token
    })
  }catch(error) {
    next(error);
  }
};
exports.register=async(req,res,next)=>{
  try {
    const {name,email,password}=req.body;
    let user=await User.findOne({email:email});
    if(user){
      return next(new ErrorHandler("User Already Exist",400));
    } 
    const hashedPassword=await bcrypt.hash(password,10);
    user=await User.create({name,email,password:hashedPassword});
    console.log(user)
    // sendCookie(user, res, "Registered Successfully", 200);
    return res.status(200).json({
      success:true,
      message:"register success",
      user
    })
  }catch(error){
    next(error);
  }
};

exports.getMyProfile=(req,res)=>{
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.logout=(req,res)=>{
  res.status(200).cookie("token", "", {
      expires: new Date(Date.now())
    }).json({
      success: true,
      user: req.user,
    });
};
