const mongoose = require("mongoose");
const schema=new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    required: true,
    type: String,
    select: false,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
});
module.exports=mongoose.model("User", schema);
