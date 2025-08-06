"use client";
import { DashboardSidebar } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCategoryName } from "../../../../../utils/categoryFormating";
import { convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";

interface DashboardSingleCategoryProps {
  params: { id: number };
}

const DashboardSingleCategory = ({
  params: { id },
}: DashboardSingleCategoryProps) => {
  const [categoryInput, setCategoryInput] = useState<{ 
    name: string; 
    parentId: string | null;
  }>({
    name: "",
    parentId: null,
  });
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const router = useRouter();

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

  const deleteCategory = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    // sending API request for deleting a category
    fetch(`/api/categories/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Category deleted successfully");
          router.push("/admin/categories");
        } else {
          throw Error("There was an error deleting a category");
        }
      })
      .catch((error) => {
        toast.error("There was an error deleting category");
      });
  };

  const updateCategory = async () => {
    if (categoryInput.name.length > 0) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: convertCategoryNameToURLFriendly(categoryInput.name),
          parentId: categoryInput.parentId,
        }),
      };
      // sending API request for updating a category
      fetch(`/api/categories/${id}`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw Error("Error updating a category");
          }
        })
        .then((data) => toast.success("Category successfully updated"))
        .catch((error) => {
          toast.error("There was an error while updating a category");
        });
    } else {
      toast.error("For updating a category you must enter all values");
      return;
    }
  };

  useEffect(() => {
    fetchParentCategories();
    
    // sending API request for getting single category
    fetch(`/api/categories/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentCategory(data);
        setCategoryInput({
          name: data?.name,
          parentId: data?.parentId || null,
        });
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex max-w-screen-2xl mx-auto">
        <DashboardSidebar />
        <div className="flex-1 xl:ml-8 max-xl:px-6">
          <div className="py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-8 py-6">
                <h1 className="text-3xl font-bold text-white">Category Details</h1>
                <p className="text-blue-100 mt-2">Manage and update category information</p>
                {currentCategory?.parent && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Subcategory of: {formatCategoryName(currentCategory.parent.name)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={formatCategoryName(categoryInput.name)}
                      onChange={(e) =>
                        setCategoryInput({ ...categoryInput, name: e.target.value })
                      }
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Category</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                      value={categoryInput.parentId || ""}
                      onChange={(e) =>
                        setCategoryInput({ ...categoryInput, parentId: e.target.value || null })
                      }
                    >
                      <option value="">No parent category (Main category)</option>
                      {Array.isArray(parentCategories) && parentCategories
                        .filter((category) => category.id !== id.toString()) // Prevent self-selection
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {formatCategoryName(category.name)}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {currentCategory?.subcategories && Array.isArray(currentCategory.subcategories) && currentCategory.subcategories.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategories</label>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex flex-wrap gap-2">
                        {currentCategory.subcategories.map((subcategory) => (
                          <span
                            key={subcategory.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5068a4] text-white"
                          >
                            {formatCategoryName(subcategory.name)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 max-sm:flex-col mb-6">
                  <button
                    type="button"
                    className="flex-1 bg-[#5068a4] hover:bg-[#3d5998] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={updateCategory}
                  >
                    Update Category
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={deleteCategory}
                  >
                    Delete Category
                  </button>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                  <p className="text-sm text-yellow-800">
                    <strong>Warning:</strong> If you delete this category, all products and subcategories associated with it will also be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;
