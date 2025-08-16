import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[700px] w-full relative overflow-hidden max-lg:h-[900px] max-md:h-[750px]">

      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero-banner.png"
          alt="Hero Banner Background"
          fill
          priority
          className="object-cover w-full h-full"
        />

         <div className="absolute inset-0 bg-black/80" />
      </div>
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10 relative z-10">
        <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
          <h1 className="text-6xl text-[#fff] font-bold mb-3 drop-shadow-lg max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            PREMIUM PCBs FOR YOUR PROJECTS
          </h1>
          <p className="text-gray-100 max-sm:text-sm leading-relaxed drop-shadow">
            Discover high-quality Printed Circuit Boards engineered for precision and reliability. 
            From prototypes to production runs, we deliver custom PCB solutions that meet your exact 
            specifications. Professional-grade circuits designed for engineers, makers, and innovators.
          </p>
          <div className="flex gap-x-4 max-lg:flex-col max-lg:gap-y-4">
            <button className="btn-pcb-hero max-lg:text-xl max-sm:text-lg">
              GET QUOTE
            </button>
            <button className="btn-pcb-secondary max-lg:text-xl max-sm:text-lg">
              DESIGN GUIDE
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fff] drop-shadow">50K+</div>
              <div className="text-sm text-gray-200">PCBs Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fff] drop-shadow">24HR</div>
              <div className="text-sm text-gray-200">Fast Turnaround</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fff] drop-shadow">99.9%</div>
              <div className="text-sm text-gray-200">Quality Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
