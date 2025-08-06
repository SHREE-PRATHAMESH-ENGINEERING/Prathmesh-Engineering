"use client";
import { DashboardSidebar } from "@/components";
import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { FaShoppingBag, FaUsers, FaChartLine, FaDollarSign } from "react-icons/fa";

const AdminDashboardPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">

        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Dashboard Overview</h1>
          <p className="text-gray-700">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-[#5068a4]">₹45,210</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-green-500 text-sm font-medium">+12.5%</span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#5068a4] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaDollarSign className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-[#5068a4]">342</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-[#5068a4] text-xs mr-1" />
                  <span className="text-[#5068a4] text-sm font-medium">+8.2%</span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#5068a4] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaShoppingBag className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-[#5068a4]">1,205</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-[#3d5998] text-xs mr-1" />
                  <span className="text-[#3d5998] text-sm font-medium">+15.3%</span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#3d5998] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaUsers className="text-[#3d5998] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Growth Rate</p>
                <p className="text-2xl font-bold text-[#5068a4]">23.5%</p>
                <div className="flex items-center mt-2">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-green-500 text-sm font-medium">+5.4%</span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaChartLine className="text-green-500 text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
