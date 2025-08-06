"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatCategoryName } from "../../../../utils/categoryFormating";

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">
        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Categories Management</h1>
          <p className="text-gray-700">Organize your products into categories</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">All Categories</h2>
            <Link href="/admin/categories/new">
              <button className="bg-[#5068a4] hover:bg-[#3d5998] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Add New Category
              </button>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#5068a4] border-opacity-20">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    <input type="checkbox" className="w-4 h-4 text-[#5068a4] rounded focus:ring-[#5068a4]" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories &&
                  categories.map((category: Category) => (
                    <tr key={nanoid()} className="hover:bg-[#5068a4] hover:bg-opacity-5 transition-colors duration-200">
                      <td className="py-3 px-4">
                        <input type="checkbox" className="w-4 h-4 text-[#5068a4] rounded focus:ring-[#5068a4]" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {formatCategoryName(category?.name)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/categories/${category?.id}`}
                          className="bg-[#5068a4] bg-opacity-10 hover:bg-opacity-20 text-[#5068a4] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
