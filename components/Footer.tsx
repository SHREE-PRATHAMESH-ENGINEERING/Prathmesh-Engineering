import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-[#5068a4] relative overflow-hidden" aria-labelledby="footer-heading">
      
      <div className="relative z-10">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-24 pb-14">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="group relative">
              <Image
                src="/logo v1.png"
                alt="Shree Prathmesh Engineering - Professional PCB Manufacturing"
                width={250}
                height={250}
                className="h-auto w-auto"
              />
              {/* Glowing effect around logo */}
              <div className="absolute inset-0 -m-4 border border-[#5068a4] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="footer-section group">
                  <h3 className="text-lg font-bold leading-6 text-[#5068a4] text-glow relative">
                    PCB Prototypes
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-500"></div>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.sale.map((item, index) => (
                      <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block"
                        >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0 footer-section group">
                  <h3 className="text-base font-bold leading-6 text-[#5068a4] text-glow relative">
                    Prathmesh Eng.
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-500"></div>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.about.map((item, index) => (
                      <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block"
                        >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="footer-section group">
                  <h3 className="text-base font-bold leading-6 text-[#5068a4] text-glow relative">
                    PCB Services
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-500"></div>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.buy.map((item, index) => (
                      <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block"
                        >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0 footer-section group">
                  <h3 className="text-base font-bold leading-6 text-[#5068a4] text-glow relative">
                    Technical Support
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-500"></div>
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.help.map((item, index) => (
                      <li key={item.name} className="footer-link" style={{animationDelay: `${index * 0.1}s`}}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-[#5068a4] transition-colors duration-300 relative group inline-block"
                        >
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
