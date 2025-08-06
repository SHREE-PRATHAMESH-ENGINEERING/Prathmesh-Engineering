import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";


import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className="w-[360px] bg-gradient-to-b from-white to-[#FAF9EE] h-full max-xl:w-full border-r-2 border-[#5068a4] shadow-lg">
      
      <div className="p-6 border-b-2 border-[#5068a4] bg-gradient-to-r from-[#5068a4] to-[#3d5998]">
        <h2 className="text-xl font-bold text-white mb-1">Admin Panel</h2>
        <p className="text-sm text-blue-100">Manage your business</p>
      </div>
      
      <nav className="p-4 space-y-2 mt-4">
        <Link href="/admin">
          <div className="flex items-center gap-3 w-full hover:bg-[#5068a4] hover:bg-opacity-10 active:bg-[#5068a4] active:bg-opacity-20 cursor-pointer px-4 py-3 text-gray-700 hover:text-[#5068a4] rounded-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#5068a4] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-[#5068a4] group-hover:bg-opacity-20 transition-all duration-300">
              <MdDashboard className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-300">Dashboard</span>
          </div>
        </Link>
        
        <Link href="/admin/orders">
          <div className="flex items-center gap-3 w-full hover:bg-[#5068a4] hover:bg-opacity-10 active:bg-[#5068a4] active:bg-opacity-20 cursor-pointer px-4 py-3 text-gray-700 hover:text-[#5068a4] rounded-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#5068a4] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-[#5068a4] group-hover:bg-opacity-20 transition-all duration-300">
              <FaBagShopping className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-300">Orders</span>
          </div>
        </Link>
        
        <Link href="/admin/products">
          <div className="flex items-center gap-3 w-full hover:bg-[#5068a4] hover:bg-opacity-10 active:bg-[#5068a4] active:bg-opacity-20 cursor-pointer px-4 py-3 text-gray-700 hover:text-[#5068a4] rounded-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#5068a4] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-[#5068a4] group-hover:bg-opacity-20 transition-all duration-300">
              <FaTable className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-300">Products</span>
          </div>
        </Link>
        
        <Link href="/admin/categories">
          <div className="flex items-center gap-3 w-full hover:bg-[#5068a4] hover:bg-opacity-10 active:bg-[#5068a4] active:bg-opacity-20 cursor-pointer px-4 py-3 text-gray-700 hover:text-[#5068a4] rounded-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#5068a4] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-[#5068a4] group-hover:bg-opacity-20 transition-all duration-300">
              <MdCategory className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-300">Categories</span>
          </div>
        </Link>
        
        <Link href="/admin/users">
          <div className="flex items-center gap-3 w-full hover:bg-[#5068a4] hover:bg-opacity-10 active:bg-[#5068a4] active:bg-opacity-20 cursor-pointer px-4 py-3 text-gray-700 hover:text-[#5068a4] rounded-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#5068a4] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-[#5068a4] group-hover:bg-opacity-20 transition-all duration-300">
              <FaRegUser className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:font-semibold transition-all duration-300">Users</span>
          </div>
        </Link>
        
        <div className="my-4 border-t-2 border-[#5068a4] border-opacity-20"></div>
        
      </nav>
    </div>
  );
};

export default DashboardSidebar;
