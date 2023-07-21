import axios from "axios";

export const axiosInstance=axios.create({});

export const ApiConnector=(method,url,bodyData,headers,params)=>{
    console.log(method)
    console.log(url)
    console.log(bodyData)
    console.log(headers)
    console.log(params)
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    });
}