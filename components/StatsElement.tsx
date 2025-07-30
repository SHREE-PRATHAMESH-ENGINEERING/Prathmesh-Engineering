import React from "react";
import { FaArrowUp } from "react-icons/fa6";


const StatsElement = () => {
  return (
    <div className="w-80 h-32 bg-gradient-to-br from-[#5068a4] to-[#3d5998] text-white flex flex-col justify-center items-center rounded-xl max-md:w-full relative overflow-hidden shadow-lg border border-[#5068a4] group transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Circuit pattern overlay */}
      <div className="absolute top-2 right-4 w-12 h-0.5 bg-white opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute bottom-2 left-4 w-8 h-0.5 bg-white opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      {/* Small circuit elements */}
      <div className="absolute top-3 left-3 w-2 h-2 bg-[#00a86b] rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-[#FAF9EE] rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <h4 className="text-xl text-white text-glow relative z-10">New Products</h4>
      <p className="text-2xl font-bold text-glow relative z-10">2,230</p>
      <p className="text-green-300 flex gap-x-1 items-center relative z-10 group-hover:text-green-200 transition-colors duration-300">
        <FaArrowUp className="transition-transform duration-300 group-hover:scale-110" />
        12.5% Since last month
      </p>
    </div>
  );
};

export default StatsElement;
