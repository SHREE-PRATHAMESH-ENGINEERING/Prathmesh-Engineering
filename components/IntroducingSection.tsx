import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-20 pt-24 bg-[#FAF9EE] relative overflow-hidden">
      
      <div className="text-center flex flex-col gap-y-8 items-center max-w-6xl mx-auto px-6 relative z-10">
        {/* Main Heading with Animation */}
        <div className="text-animate">
          <h2 className="text-black text-8xl font-extrabold text-center mb-2 max-md:text-6xl max-[480px]:text-4xl leading-tight">
            INTRODUCING{" "}
            <span className="relative text-[#5068a4] text-glow">
              PRATHMESH
              {/* Circuit trace under text */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-30"></div>
            </span>
            {" "}
            <span className="text-black">ENGINEERING</span>
          </h2>
        </div>
        
        {/* Enhanced Description Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-animate-delay">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-xl group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#3d5998] rounded-t-2xl"></div>
            <p className="text-gray-800 text-center text-xl font-semibold max-md:text-lg max-[480px]:text-base group-hover:text-[#5068a4] transition-colors duration-300">
              Premium PCBs for all your electronic projects.
            </p>
            {/* Small circuit indicator */}
            <div className="w-8 h-0.5 bg-[#5068a4] mx-auto mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-xl group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d5998] to-[#5068a4] rounded-t-2xl"></div>
            <p className="text-gray-800 text-center text-xl font-semibold max-md:text-lg max-[480px]:text-base group-hover:text-[#5068a4] transition-colors duration-300">
              High-quality Printed Circuit Boards designed for professionals.
            </p>
            {/* Small circuit indicator */}
            <div className="w-8 h-0.5 bg-[#5068a4] mx-auto mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Enhanced CTA Button */}
        <div className="text-animate-delay-2">
          <Link href="/shop" className="relative inline-block group">
            <div className="btn-pcb-hero text-white font-bold px-16 py-4 text-xl max-md:text-lg max-md:px-12 rounded-2xl shadow-2xl">
              <span className="relative z-10 flex items-center gap-3">
                SHOP NOW
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
            
            {/* Floating circuit elements around button */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#5068a4] rounded-full opacity-60 group-hover:animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#00a86b] rounded-full opacity-40 group-hover:animate-pulse"></div>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-12 text-animate-delay-2">
          <div className="text-center group cursor-pointer">
            <div className="text-4xl font-bold text-[#5068a4] text-glow group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
            <div className="w-16 h-px bg-[#5068a4] mx-auto mt-2 opacity-60"></div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl font-bold text-[#5068a4] text-glow group-hover:scale-110 transition-transform duration-300">24HR</div>
            <div className="text-sm text-gray-600 font-medium">Fast Delivery</div>
            <div className="w-16 h-px bg-[#5068a4] mx-auto mt-2 opacity-60"></div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl font-bold text-[#5068a4] text-glow group-hover:scale-110 transition-transform duration-300">99.9%</div>
            <div className="text-sm text-gray-600 font-medium">Quality Rate</div>
            <div className="w-16 h-px bg-[#5068a4] mx-auto mt-2 opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;
