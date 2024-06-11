"use client"
import axios from 'axios';
import React from 'react'
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';

const LogOut = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            toast.success('LogOut Successful');
            console.log('LogOut Successful');
            router.push('/login');
            
        } catch (error: any) {
            console.log("LogOut Failed", error.message);
            toast.error('LogOut Failed');
        }
        console.log('Logout')
    }
  return (
    <section>
        <button className='btn_red rounded-full' onClick={handleLogout}>
            LogOut
        </button>
    </section>
  )
}

export default LogOut
