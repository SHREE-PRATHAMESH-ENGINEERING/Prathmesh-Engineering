"use client";
import React, { useState, useEffect } from 'react';
import { termsConditionsContent } from "@/lib/utils";

const PolicyPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#eaf1fb] to-[#f5f8ff] relative overflow-hidden">

      <div className="absolute inset-0 pcb-hero-bg opacity-30"></div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

        <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-30 animate-pulse float-element"></div>
        <div className="absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-transparent via-[#00a86b] to-transparent opacity-40 animate-pulse float-delay-1"></div>
        <div className="absolute bottom-40 left-20 w-40 h-1 bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-25 animate-pulse float-delay-2"></div>
        <div className="absolute bottom-20 right-10 w-28 h-1 bg-gradient-to-r from-transparent via-[#3d5998] to-transparent opacity-35 animate-pulse float-element"></div>
        
        <div className="absolute top-32 left-44 w-4 h-4 bg-[#5068a4] rounded-full opacity-40 animate-pulse electric-pulse"></div>
        <div className="absolute top-60 right-40 w-3 h-3 bg-[#00a86b] rounded-full opacity-50 animate-pulse electric-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-60 left-60 w-5 h-5 bg-[#5068a4] rounded-full opacity-30 animate-pulse electric-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-[#3d5998] rounded-full opacity-45 animate-pulse electric-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <section className={`relative py-20 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center animate-in">
            <h1 className="text-4xl md:text-6xl font-bold text-[#5068a4] mb-6">
               Terms & Conditions
            </h1>
            <p className="text-md text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Terms and Conditions for Shree Prathmesh Engineering
            </p>
    
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-20 relative z-10">
        <div className="max-w-7xl py-10 mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
            {termsConditionsContent}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyPage;