const express=require("express");
const {deleteTask,getMyTask,newTask,updateTask}=require("../controllers/task.js") ;
const {isAuthenticated}=require("../middlewares/auth.js");
const router=express.Router();
router.post("/new",isAuthenticated,newTask);
router.post("/my",isAuthenticated,getMyTask);
router
  .route("/id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
module.exports=router
