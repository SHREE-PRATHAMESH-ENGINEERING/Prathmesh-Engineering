import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  return (
    <Link href={href} className="block group h-full">
      <div className="relative flex flex-col items-center justify-center gap-y-4 cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-48 w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
        {/* PCB Circuit Border Effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#3d5998] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        
        {/* Background Circuit Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #5068a4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3d5998 1px, transparent 1px)`,
               backgroundSize: '30px 30px, 20px 20px'
             }}>
        </div>
        
        {/* Icon Container with Glow Effect */}
        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner group-hover:shadow-lg transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#5068a4]/10 group-hover:to-[#3d5998]/10 flex-shrink-0">
          <div className="transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {children}
          </div>
          
          {/* Glowing Ring Effect */}
          <div className="absolute inset-0 rounded-xl border-2 border-[#5068a4] opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
        </div>

        {/* Category Title */}
        <h3 className="font-bold text-base text-center text-gray-800 group-hover:text-[#5068a4] transition-all duration-500 group-hover:scale-105 leading-tight px-2 flex-shrink-0">
          {title}
        </h3>
        
        {/* Circuit Flow Indicator */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-0 group-hover:opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700"></div>
        
        {/* Floating PCB Elements */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#5068a4] rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-500"></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#00a86b] rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-700"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </div>
    </Link>
  );
};

export default CategoryItem;
