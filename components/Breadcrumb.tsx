import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";

const Breadcrumb = () => {
  return (
    <div className="text-lg breadcrumbs pb-10 py-5 max-sm:text-base relative">
      {/* Subtle circuit elements */}
      <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-[#5068a4] opacity-20"></div>
      <div className="absolute top-1/2 right-0 w-6 h-0.5 bg-[#5068a4] opacity-25"></div>
      
      <ul className="relative z-10">
        <li>
          <Link href="/" className="group flex items-center transition-colors duration-300 hover:text-[#5068a4]">
            <FaHouse className="mr-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/shop" className="group transition-colors duration-300 hover:text-[#5068a4] relative">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li>
          <Link href="/shop" className="group transition-colors duration-300 hover:text-[#5068a4] relative">
            All products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5068a4] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
