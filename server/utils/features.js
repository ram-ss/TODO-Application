const jwt=require("jsonwebtoken");
require('dotenv').config();
exports.sendCookie=(user,res,message,statusCode=200)=>{
  const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
  return res
    .cookie("token",token,{
      httpOnly: true,
      expiresIn:Date(Date.now()+3*24*60*60*1000),
    })
    .status(statusCode)
    .json({
      success: true,
      message,
      data:user,
      token
    });
};
