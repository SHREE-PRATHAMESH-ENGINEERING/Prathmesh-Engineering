"use client";
import {
  DashboardProductTable,
  DashboardSidebar,
} from "@/components";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">
        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Products Management</h1>
          <p className="text-gray-700">Manage your product catalog and inventory</p>
        </div>
        <DashboardProductTable />
      </div>
    </div>
  );
};

export default DashboardProducts;
