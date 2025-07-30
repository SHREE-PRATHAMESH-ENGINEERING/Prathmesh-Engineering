import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[700px] w-full bg-[#FAF9EE] max-lg:h-[900px] max-md:h-[750px] relative overflow-hidden">
      
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10 relative z-10">
        <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
          <h1 className="text-6xl text-[#5068a4] font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            PREMIUM PCBs FOR YOUR PROJECTS
          </h1>
          <p className="text-gray-700 max-sm:text-sm text-animate-delay leading-relaxed">
            Discover high-quality Printed Circuit Boards engineered for precision and reliability. 
            From prototypes to production runs, we deliver custom PCB solutions that meet your exact 
            specifications. Professional-grade circuits designed for engineers, makers, and innovators.
          </p>
          <div className="flex gap-x-4 max-lg:flex-col max-lg:gap-y-4 text-animate-delay-2">
            <button className="btn-pcb-hero max-lg:text-xl max-sm:text-lg">
              GET QUOTE
            </button>
            <button className="btn-pcb-secondary max-lg:text-xl max-sm:text-lg">
              DESIGN GUIDE
            </button>
          </div>
          
          {/* PCB Stats with Animation */}
          <div className="grid grid-cols-3 gap-6 mt-8 text-animate-delay-2">
            <div className="text-center animate-scale" style={{animationDelay: '0.8s'}}>
              <div className="text-3xl font-bold text-[#5068a4] text-glow">50K+</div>
              <div className="text-sm text-gray-600">PCBs Delivered</div>
            </div>
            <div className="text-center animate-scale" style={{animationDelay: '1s'}}>
              <div className="text-3xl font-bold text-[#5068a4] text-glow">24HR</div>
              <div className="text-sm text-gray-600">Fast Turnaround</div>
            </div>
            <div className="text-center animate-scale" style={{animationDelay: '1.2s'}}>
              <div className="text-3xl font-bold text-[#5068a4] text-glow">99.9%</div>
              <div className="text-sm text-gray-600">Quality Rate</div>
            </div>
          </div>
        </div>
        
        <div className="relative animate-in-right">
          <Image
            src="/img/hero.jpg"
            width={400}
            height={400}
            alt="Professional PCB circuit board for electronics projects"
            className="max-md:w-[300px] max-md:h-[300px] max-sm:h-[250px] max-sm:w-[250px] w-auto h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
