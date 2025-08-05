"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { brands } from '@/lib/utils';

const BrandsStrip = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (brandName: string) => {
    setImageErrors(prev => ({ ...prev, [brandName]: true }));
  };

  const renderBrandContent = (brand: { name: string; logo: string }, index: number) => {
    const hasError = imageErrors[brand.name];
    
    return (
      <div className="text-center px-4">
        {!hasError ? (
          <div className="relative w-20 h-12 mx-auto">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              sizes="(max-width: 768px) 60px, 80px"
              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              onError={() => handleImageError(brand.name)}
            />
          </div>
        ) : (
          <div 
            className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
          >
            {brand.name.charAt(0)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-16 pb-12 overflow-hidden bg-[#FAF9EE]">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#5068a4] mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with industry leaders to deliver cutting-edge PCB solutions for the world&apos;s most innovative electronic products.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll space-x-8 items-center">

            {brands.map((brand, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center hover:rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 group"
              >
                {renderBrandContent(brand, index)}
              </div>
            ))}
            
            {brands.map((brand, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center hover:rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 group"
              >
                {renderBrandContent(brand, index)}
              </div>
            ))}
          </div>
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
