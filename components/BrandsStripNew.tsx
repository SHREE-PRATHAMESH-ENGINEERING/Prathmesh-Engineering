"use client";
import React from 'react';

const BrandsStrip = () => {
  // Array of electric/electronic brands
  const brands = [
    { name: 'Intel', color: '#0071c5' },
    { name: 'AMD', color: '#ed1c24' },
    { name: 'NVIDIA', color: '#76b900' },
    { name: 'Qualcomm', color: '#3253dc' },
    { name: 'Broadcom', color: '#cc092f' },
    { name: 'Texas Instruments', color: '#cc0000' },
    { name: 'Analog Devices', color: '#0066cc' },
    { name: 'Microchip', color: '#ee3124' },
    { name: 'STMicroelectronics', color: '#03234b' },
    { name: 'Infineon', color: '#1a1a1a' },
    { name: 'NXP', color: '#ff6600' },
    { name: 'Xilinx', color: '#ee3124' },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#5068a4] mb-4">
            Trusted by Leading Electronic Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with industry leaders to deliver cutting-edge PCB solutions for the world's most innovative electronic products.
          </p>
        </div>
        
        {/* Moving strip container */}
        <div className="relative">
          <div className="flex animate-scroll space-x-8 items-center">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 group"
              >
                <div className="text-center px-4">
                  <div 
                    className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 leading-tight">
                    {brand.name.length > 12 ? brand.name.substring(0, 12) + '...' : brand.name}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 group"
              >
                <div className="text-center px-4">
                  <div 
                    className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: brand.color }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 leading-tight">
                    {brand.name.length > 12 ? brand.name.substring(0, 12) + '...' : brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandsStrip;
