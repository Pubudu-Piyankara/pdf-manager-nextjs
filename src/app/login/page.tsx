"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LogInPage = () => {
    const router = useRouter()
    const [user, setUser] = React.useState(
      {
        email: "",
        password: "",
      }
    );
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])
    
    const onLogin = async () => {
      try {
        setLoading(true)
       const response= await axios.post("api/auth/login",user);
        console.log("Login success",response.data);
        toast.success("Login  success");
        router.push("/home");
      } catch (error:any) {
        toast.error(error.response.data.error)
        console.log("Login failed",error.response.data.error)
      }finally{
        setLoading(false);
      }
    }
    return (
        <section className="flex flex-row">
            <div className="flex flex-col justify-center items-center bg-yellow-50 h-screen px-12 gap-16 lg:px-32 z-10 lg:flexCenter">
                <div className="flex flex-col gap-5 flexCenter p-10">
                    <form className="flex flex-col">
                        <label>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="border border-gray-400 p-2 m-2 rounded-full"
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="border border-gray-400 p-2 m-2 rounded-full"
                        />
                    </form>
                    <button
                        className="border border-gray-400 p-2 m-2 rounded-full btn_blue"
                        onClick={onLogin}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <Link href="/signup" className="text-blue-400">
                        Donot you have an account?
                    </Link>
                </div>
            </div>
            <div className="bg-yellow-50">
                <Image
                    src="/login.jpg"
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="z-0 w-full h-screen rounded-l-full absolute object-cover custom-shape opacity-50 lg:opacity-100 sm:w-full lg:relative lg:h-screen lg:w-auto"
                />
            </div>
        </section>
    );
};

export default LogInPage;