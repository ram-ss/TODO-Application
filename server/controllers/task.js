const ErrorHandler=require("../middlewares/error.js");
const Task=require("../models/task.js");

exports.newTask=async(req,res,next)=>{
  try{
    const {title,description}=req.body;
    const response=await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task added Successfully",
      data:response
    });
  }catch(error){
    next(error);
  }
};

exports.getMyTask=async(req,res,next)=>{
  try {
    const userid=req.user._id;
    const tasks=await Task.find({user:userid});
    res.status(200).json({
      success: true,
      response:tasks,
    });
  }catch(error){
    next(error);
  }
};

exports.updateTask=async(req,res,next)=>{
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  }catch(error){
    next(error);
  }
};

exports.deleteTask=async(req,res,next)=>{
  try{
    console.log(req.body.id)
    const task=await Task.findById(req.body.id);
    if(!task){
      return next(new ErrorHandler("Task not found", 404));
    }
    await task.deleteOne();
    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  }catch(error){
    next(error);
  }
};
