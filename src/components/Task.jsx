import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createTask, getTask,deleteTask } from '../services/operations/task';
import {MdDeleteOutline} from 'react-icons/md'
import Error from './Error';

function Task() {
    const [temp,setTemp]=useState(false)
    const {token}=useSelector((state)=>(state.auth));
    console.log(token);
    const [list,setList]=useState([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        taskTitle:"",
        taskDesc:"",
    })
    const {taskTitle,taskDesc}=formData;
    const handleOnChange=(e)=>{
        setFormData((preData)=>(
            {...preData,[e.target.name]:e.target.value}
        ))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        setFormData({
            taskTitle:"",
            taskDesc:"",
        })
        dispatch(createTask(taskTitle,taskDesc,token));
    }
    const fetchData=async()=>{
        await setList(await dispatch(getTask(token)));
    }
    useEffect(()=>{
        fetchData();
    },[temp,formData])
  return (
    <>
        {
            token!==null && (<div className='pt-10 min-h-[calc(100vh-3.5rem)] bg-zinc-200 gap-2 flex flex-col items-center'>
        <div>
            <form className=' max-w-content flex gap-4'
            onSubmit={handleOnSubmit}>
                <div>
                    <p className="font-bold mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Task Name <sup className="text-pink-500">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="taskTitle"
                    value={taskTitle}
                    onChange={handleOnChange}
                    placeholder="Enter Task Name"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                </div>
                <div>
                    <p className="font-bold mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Task Description <sup className="text-pink-500">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="taskDesc"
                    value={taskDesc}
                    onChange={handleOnChange}
                    placeholder="Enter Task Description"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                </div>
                <button type='submit'
                className='mt-6 rounded-[8px] py-[8px] px-[12px] font-medium bg-lime-400 '>
                Register Task
                </button>
            </form>
        </div>
        {
            list.length>0 &&(
                <>
                <p className='text-slate-900 font-bold mt-10 mb-5'>Pending Task</p>
                {    
                list.map((item,index)=>(
                    <>
                        <div key={index} className='rounded-lg w-[500px] bg-zinc-100 flex justify-between items-center p-5 '>
                            <div className='flex flex-col '>
                                <p className='capitalize font-bold text-slate-900'>{item.title}</p>
                                <p className='text-sm text-slate-400'>{item.description}</p>
                            </div>
                            <div className='text-3xl rounded-full border-[2px] border-red-600 bg-red-300 text-red-500 cursor-pointer'
                            onClick={async ()=>{
                                await dispatch(deleteTask(token,item._id))
                                setTemp(!temp)
                            }}>
                                <MdDeleteOutline/>
                            </div>
                        </div>
                    </>
                ))
                }
                </>
                )
        }
    </div>)
        }
        {
            token===null && (<Error/>)
        }
    </>
  )
}

export default Task