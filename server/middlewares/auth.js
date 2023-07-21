const User=require("../models/user.js");
const jwt=require("jsonwebtoken");
require('dotenv').config();
exports.isAuthenticated=async(req,res,next)=>{
  const token=req.cookies.token || req.body.token ;
  if(!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
  req.user=await User.findById(decoded._id);
  next();
};
