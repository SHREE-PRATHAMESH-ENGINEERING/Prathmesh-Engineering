"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import { socialMediaIcons } from "@/lib/utils";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      FaPhone,
      FaWhatsapp,
      FaLinkedin,
      FaInstagram,
      FaTwitter,
      FaFacebook,
      FaEnvelope
    };
    return iconMap[iconName];
  };
  return (
    <div className="h-16 text-[#5068a4] bg-white max-lg:px-5 max-lg:h-auto max-lg:py-3 max-sm:px-2 max-sm:py-2 relative overflow-hidden border-b border-gray-200">
      
      <div className="absolute top-1/2 left-1/4 w-12 h-0.5 bg-[#5068a4] opacity-10 animate-pulse max-sm:hidden"></div>
      <div className="absolute top-1/2 right-1/4 w-8 h-0.5 bg-[#5068a4] opacity-15 animate-pulse max-sm:hidden" style={{animationDelay: '1s'}}></div>
      
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-y-2 max-w-screen-2xl mx-auto px-12 max-md:px-6 max-sm:px-2 relative z-10">
        
        <ul className="flex items-center h-full gap-x-2 max-lg:h-auto">
          {socialMediaIcons.map((social) => {
            const IconComponent = getIconComponent(social.icon);
            return (
              <li key={social.id} className="flex items-center">
                <a 
                  href={social.href} 
                  {...(social.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#5068a4] hover:bg-opacity-10 transition-all duration-300 group max-sm:w-9 max-sm:h-9"
                  title={social.title}
                >
                  {IconComponent && <IconComponent className="text-[#5068a4] text-xl transition-all duration-300 group-hover:scale-110 group-hover:text-[#3d5998] max-sm:text-lg" />}
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="flex items-center gap-x-5 h-full max-lg:h-auto max-md:gap-x-3 max-sm:gap-x-2 font-semibold max-[450px]:mt-1">
          {!session ? ( 
          <>
          <li className="flex items-center">
            <Link href="/login" className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1 text-[#5068a4]">
              <FaRegUser className="text-[#5068a4] transition-all duration-300 group-hover:scale-110 group-hover:text-[#3d5998] max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-[#3d5998]">Login</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/register" className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1 text-[#5068a4]">
              <FaRegUser className="text-[#5068a4] transition-all duration-300 group-hover:scale-110 group-hover:text-[#3d5998] max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-[#3d5998]">Register</span>
            </Link>
          </li>
          </>
          ) :  (<>
          <span className="ml-10 text-base text-[#5068a4] font-medium max-lg:ml-0 max-sm:text-sm max-[450px]:text-xs truncate max-w-[150px]">{session.user?.email}</span>
          <li className="flex items-center">
            <button onClick={() => handleLogout()} className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] hover:bg-opacity-10 px-2 py-1 rounded transition-all duration-300 max-sm:text-sm max-sm:gap-x-1 max-sm:px-1 text-[#5068a4]">
              <FaRegUser className="text-[#5068a4] transition-all duration-300 group-hover:scale-110 group-hover:text-[#3d5998] max-sm:text-sm" />
              <span className="transition-all duration-300 group-hover:text-[#3d5998]">Log out</span>
            </button>
          </li>
          </>)}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
