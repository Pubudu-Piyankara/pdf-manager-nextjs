"use client";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Sign } from "crypto";

const SignUpPage = () => {
  const router = useRouter()
  const [user, setUser] = React.useState(
    {
      email: "",
      password: "",
      name: "",

    }
  );

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/auth/signup", user)
      console.log("Signup success", response.data)
      router.push("/login");
    } catch (error: any) {
      toast.error("User Already exists\n "+error.message)
      console.log("SignUp failed", error.message)   
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <section className="flex flex-row">
      <div className="bg-orange-50">
      <Image
          src="/hero.jpg"
          alt="PDF"
          width={1000}
          height={1000}
          className="absolute rounded-r-full object-cover custom-shape opacity-70 lg:opacity-100 sm:w-full  lg:relative lg:h-screen"
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-slate-100 z-10 h-screen text-white lg:text-black lg:w-1/2">
        <form className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border border-gray-400 p-2 m-2 rounded-full"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-gray-400 p-2 m-2 rounded-full"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border border-gray-400 p-2 m-2 rounded-full"
          />
          <button
            type="submit"
            className="border border-gray-400 p-2 m-2 rounded-full btn_blue"
            disabled={loading}
            onClick={onSignUp}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <Link href="/login" className="text-blue-400">
          Already have an account?
        </Link>
      </div>
    </section>
  );
};

export default SignUpPage;
