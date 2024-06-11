"use client";
import React, { ReactHTMLElement, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Sign } from "crypto";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({} as SignUpUser);
  const [loading, setLoading] = useState(false);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", user);
      console.log("success", res.data);
      toast.success("Sign Up successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up Failed", error);
      toast.error("Sign Up Failed/ User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-row">
      <div className="bg-gray-100">
        <Image
          src="/signup2.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className="w-auto h-screen rounded-r-full  object-cover custom-shape opacity-70 lg:opacity-100 lg:relative lg:h-screen lg:w-auto z-0"
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-slate-100 z-10 h-screen text-white lg:text-black lg:w-1/2">
        <form className="flex flex-col" onSubmit={signUp}>
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
