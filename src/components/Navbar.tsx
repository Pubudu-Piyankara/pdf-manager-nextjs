"use client";
import LogOut from "@/app/logout/page";
import { NAVBAR_ITEMS } from "@/constants";
import Link from "next/link";
import { it } from "node:test";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userData, setUserData] = useState({} as SignUpUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
      <section className="fixed w-full h-20 bg-white visible padding-container shadow-sm rounded-md z-20">
        <nav className="flexBetween max-container w-full  top-0 left-0 right-0 z-50 py-5 padding-container">
          <Link href="/" className="flexCenter regular-20">
            Logo
          </Link>
          <ul className="gap-12 hidden lg:flex flex-row">
            {NAVBAR_ITEMS.map((item) => (
              <Link
                href={item.href}
                key={item.key}
                className="flexCenter regular-20 hover:font-bold"
              >
                <li>{item.name}</li>
              </Link>
            ))}
          </ul>
          <div className="hidden lg:fleCenter lg:flex flex-row gap-5 ">
            <Link href="/login" className="flexCenter regular-20 btn_blue">
              Login
            </Link>
            <Link href="/signup" className="flexCenter regular-20 btn_blue">
              Sign Up
            </Link>
            <LogOut />
            
          </div>
        </nav>
      </section>
    
  );
};

export default Navbar;
