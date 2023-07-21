import React from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { navlink } from '../data/navlink'
import { useDispatch, useSelector } from 'react-redux';
import {PiUserBold} from 'react-icons/pi';
import Dropdown from './Dropdown';
import { logout } from '../services/operations/auth';


function Navbar() {
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    const {token}=useSelector((state)=>(state.auth));
    return (
    <div className='flex items-center justify-center border-b-[3px] border-b-zinc-500 w-full h-14 bg-zinc-900'>
        <div className='flex w-11/12 max-w-content items-center justify-between'>
            {/* logo */}
            <Link to="/">
                <div className='flex items-center gap-2'>
                    <img src={logo} loading='lazy' width={50} height={50} />
                    <h1 className=' font-bold text-xl text-zinc-400'>TODO APPLICATION</h1>
                </div>    
            </Link>
            {/* links */}
            <nav>
                <ul className='flex gap-x-6 font-bold'>
                    {
                        navlink.map((link,index)=>(
                            <li key={index}>
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path)?"text-lime-300":"text-zinc-400"}`}>{link?.title}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            {/* login signup */}
            <div className='flex gap-x-4 items-center'>
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-zinc-500 bg-zinc-900 px-[12px] py-[8px] text-zinc-400 rounded-md font-bold'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-zinc-500 bg-zinc-900 px-[12px] py-[8px] text-zinc-400 rounded-md font-bold'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !==null && (
                        <div className='text-zinc-400 flex gap-x-1 rounded-full border border-zinc-500 text-2xl cursor-pointer'
                        onClick={()=>{dispatch(logout(navigate))}}>
                        <PiUserBold/>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar