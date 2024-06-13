"use client";
import LogOut from "@/app/logout/page";
import { NAVBAR_ITEMS } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { it } from "node:test";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cookies } from 'next/headers'
 

 

const Navbar = () => {
  const [userData, setUserData] = useState({} as SignUpUser);
  const [loading, setLoading] = useState(false);




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

        
        
          {userData ? (
            <div className="text-white lg:flexCenter">
              <section className="">
                <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src="/user.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="border-green-50 bg-green-500 px-8 py-2 text-white rounded-full">
                      {userData.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </section>
            </div>
          ) : (
            <div className="hidden lg:flexCenter gap-5">
              <Link href="/login" className="flexCenter regular-20 btn_blue">
                Login
              </Link>
              <Link href="/signup" className="flexCenter regular-20 btn_blue">
                Sign Up
              </Link>
            </div>
          )}
        
      </nav>
    </section>
  );
};

export default Navbar;
