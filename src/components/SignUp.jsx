import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { signup } from '../services/operations/auth';

function SignUp() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password}=formData;
    const handleOnChange=(e)=>{
        setFormData((preData)=>(
            {...preData,[e.target.name]:e.target.value}
        ))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(signup(name,email,password,navigate))
    }
  return (
    <div className='flex flex-col min-h-[calc(100vh-3.5rem)] items-center justify-center bg-zinc-200 gap-2'>
        <img src={logo} alt="" height={100} width={100} />
        <p className='text-6xl text-zinc-900 '>SignUp</p>
        <form className='mt-5 flex flex-col gap-4'
        onSubmit={handleOnSubmit}
        >
            <div>
                <p className="font-bold mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Name <sup className="text-pink-500">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    placeholder="Enter Name"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
            </div>
            <div>
                <p className="font-bold mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email <sup className="text-pink-500">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter Email"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
            </div>
            <div>
                <p className="font-bold mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-500">*</sup>
                </p>
                <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
            </div>
            <button type='submit'
            className='mt-6 rounded-[8px] py-[8px] px-[12px] font-medium bg-lime-400 '>
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignUp