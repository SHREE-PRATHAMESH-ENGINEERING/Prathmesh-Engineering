"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }
  return (
    <div className="h-20 text-white bg-[#5068a4] max-lg:px-5 max-lg:h-auto max-lg:py-3 max-sm:px-2 max-sm:py-2 relative overflow-hidden">
      {/* Subtle circuit patterns */}
      <div className="absolute top-1/2 left-1/4 w-12 h-0.5 bg-white opacity-10 animate-pulse max-sm:hidden"></div>
      <div className="absolute top-1/2 right-1/4 w-8 h-0.5 bg-white opacity-15 animate-pulse max-sm:hidden" style={{animationDelay: '1s'}}></div>
      
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-y-2 max-w-screen-2xl mx-auto px-12 max-md:px-6 max-sm:px-2 relative z-10">
        {/* Social Media Icons - Left Side */}
        <ul className="flex items-center h-full gap-x-4 max-lg:h-auto max-md:gap-x-3 max-sm:gap-x-2">
          <li className="flex items-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
            >
              <FaInstagram className="text-white text-lg transition-transform duration-300 group-hover:scale-110" />
            </a>
          </li>
          <li className="flex items-center">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
            >
              <FaTwitter className="text-white text-lg transition-transform duration-300 group-hover:scale-110" />
            </a>
          </li>
          <li className="flex items-center">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
            >
              <FaFacebook className="text-white text-lg transition-transform duration-300 group-hover:scale-110" />
            </a>
          </li>
          <li className="flex items-center">
            <a 
              href="mailto:sales@prathmeshengineering.com"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
            >
              <FaEnvelope className="text-white text-lg transition-transform duration-300 group-hover:scale-110" />
            </a>
          </li>
        </ul>

        <ul className="flex items-center gap-x-5 h-full max-lg:h-auto max-md:gap-x-3 max-sm:gap-x-2 font-semibold max-[450px]:mt-1">
          {!session ? ( 
          <>
          <li className="flex items-center">
            <Link href="/login" className="flex items-center gap-x-2 font-semibold group hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1">
              <FaRegUser className="text-white transition-transform duration-300 group-hover:scale-110 max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-shadow">Login</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/register" className="flex items-center gap-x-2 font-semibold group hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1">
              <FaRegUser className="text-white transition-transform duration-300 group-hover:scale-110 max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-shadow">Register</span>
            </Link>
          </li>
          </>
          ) :  (<>
          <span className="ml-10 text-base text-glow max-lg:ml-0 max-sm:text-sm max-[450px]:text-xs truncate max-w-[150px]">{session.user?.email}</span>
          <li className="flex items-center">
            <button onClick={() => handleLogout()} className="flex items-center gap-x-2 font-semibold group hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1">
              <FaRegUser className="text-white transition-transform duration-300 group-hover:scale-110 max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-shadow">Log out</span>
            </button>
          </li>
          </>)}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
