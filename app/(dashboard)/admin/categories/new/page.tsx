"use client";
import { DashboardSidebar } from "@/components";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";

const DashboardNewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    parentId: "",
  });
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  const fetchParentCategories = async () => {
    try {
      const response = await fetch('/api/categories/parents');
      const data = await response.json();
      // Ensure data is an array before setting it
      setParentCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      setParentCategories([]); // Set empty array on error
    }
  };

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const addNewCategory = () => {
    if (categoryInput.name.length > 0) {
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: convertCategoryNameToURLFriendly(categoryInput.name),
          parentId: categoryInput.parentId || null,
        }),
      };
      // sending API request for creating new category
      fetch(`/api/categories`, requestOptions)
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw Error("There was an error while creating category");
          }
        })
        .then((data) => {
          toast.success("Category added successfully");
          setCategoryInput({
            name: "",
            parentId: "",
          });
        })
        .catch((error) => {
          toast.error("There was an error while creating category");
        });
    } else {
      toast.error("You need to enter values to add a category");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex max-w-screen-2xl mx-auto">
        <DashboardSidebar />
        <div className="flex-1 xl:ml-8 max-xl:px-6">
          <div className="py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-8 py-6">
                <h1 className="text-3xl font-bold text-white">Add New Category</h1>
                <p className="text-blue-100 mt-2">Create a new category or subcategory for your products</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={categoryInput.name}
                      onChange={(e) =>
                        setCategoryInput({ ...categoryInput, name: e.target.value })
                      }
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Category (Optional)</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                      value={categoryInput.parentId}
                      onChange={(e) =>
                        setCategoryInput({ ...categoryInput, parentId: e.target.value })
                      }
                    >
                      <option value="">Select parent category (optional)</option>
                      {Array.isArray(parentCategories) && parentCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Leave parent category empty to create a main category. Select a parent to create a subcategory.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 max-sm:flex-col">
                  <button
                    type="button"
                    onClick={addNewCategory}
                    className="flex-1 bg-[#5068a4] hover:bg-[#3d5998] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewCategoryPage;
