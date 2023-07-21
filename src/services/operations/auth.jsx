import { toast } from "react-hot-toast";
import { setToken,setLoading } from "../../slice/authSlice";
import { ApiConnector } from "../ApiConnector";
import { authEndpoints } from "../Api";

const {REGISTER_API,LOGIN_API,MYPROFILE_API}=authEndpoints;

export function signup(name,email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await ApiConnector("POST",REGISTER_API,{
                name,
                email,
                password,
            })
            console.log("register api response...........",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful");
            navigate("/login")
        }catch(error){
            console.log("signup api error..............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await ApiConnector("POST",LOGIN_API,{
                email,
                password
            })
            console.log("login api response..........",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successful");
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token))
        }catch(error){
            console.log("login api error..............", error)
            toast.error("login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        navigate("/task")
    }
}
 
export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.success("Logged Out")
        navigate("/")
    }
}