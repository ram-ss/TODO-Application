const express = require("express");
const userRouter = require("./routes/user.js")
const taskRouter = require("./routes/task.js")
const cookieParser = require("cookie-parser");
const {errorMiddleware} =require("./middlewares/error.js")
const database = require("./config/database.js");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();

const app=express();
const PORT=process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
	{
		origin:"http://localhost:3000",
        credentials:true
	}
))
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.get("/api/v1/",(req,res)=>{
	return res.json({
		success:true,
		message:'server is up and running....'
	});
});
app.use(errorMiddleware);
app.listen(PORT,()=>{
	console.log(`App is running at ${PORT}`)
})
