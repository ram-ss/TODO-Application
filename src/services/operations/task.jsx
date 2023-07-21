import { toast } from "react-hot-toast";
import { ApiConnector } from "../ApiConnector";
import { taskEndpoints } from "../Api";

const {CREATE_TASK_API,GET_TASK_API,DELETE_TASK_API}=taskEndpoints;

export function createTask(taskTitle,taskDesc,token){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const response=await ApiConnector("POST",CREATE_TASK_API,{
                title:taskTitle,
                description:taskDesc,
                token:token
            })
            console.log("createTask api response...........",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Task Added Successfully");
        }catch(error){
            console.log("createTask api error...........",error)
            toast.error("Task Addition Failed")
        }
        toast.dismiss(toastId)
    }
}

export function getTask(token){
    return async()=>{
        try{
            const response=await ApiConnector("POST",GET_TASK_API,{
                token:token
            });
            console.log("getTask api response...........",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            return response.data.response;
        }catch(error){
            console.log("getTask api error...........",error);
        }
    }
}

export function deleteTask(token,id){
    return async ()=>{
        const toastId=toast.loading("Loading...");
    try{
        const response=await ApiConnector("DELETE",DELETE_TASK_API,{
            token:token,
            id:id
        })
        console.log(response)
    }catch(error){
        console.log("some erroe occured while deleting")
        toast.error("Failed")
    }
    toast.success("Task Completed")
    toast.dismiss(toastId);
    }
}