"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in input fields");
      return;
    }

    const requestOptions: any = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`/api/products`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw Error("There was an error while creating product");
        }
      })
      .then((data) => {
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("There was an error while creating product");
      });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("File upload unsuccessfull");
      }
    } catch (error) {
      console.error("Error happend while sending request:", error);
    }
  };

  const fetchCategories = async () => {
    fetch(`/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array before setting it
        const categoriesData = Array.isArray(data) ? data : [];
        setCategories(categoriesData);
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: categoriesData[0]?.id || "",
        });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCategories([]);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex max-w-screen-2xl mx-auto">
        <DashboardSidebar />
        <div className="flex-1 xl:ml-8 max-xl:px-6">
          <div className="py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-8 py-6">
                <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                <p className="text-blue-100 mt-2">Create a new product entry for your store</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={product?.title}
                      onChange={(e) =>
                        setProduct({ ...product, title: e.target.value })
                      }
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Slug</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={convertSlugToURLFriendly(product?.slug)}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          slug: convertSlugToURLFriendly(e.target.value),
                        })
                      }
                      placeholder="product-slug-url"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                      value={product?.categoryId}
                      onChange={(e) =>
                        setProduct({ ...product, categoryId: e.target.value })
                      }
                    >
                      <option value="">Select a category</option>
                      {Array.isArray(categories) && categories
                        .filter(category => !category.parentId) // Only show main categories first
                        .map(category => [
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>,
                          // Add subcategories indented
                          ...(category.subcategories && Array.isArray(category.subcategories) 
                            ? category.subcategories.map(subcategory => (
                                <option key={subcategory.id} value={subcategory.id}>
                                  └ {subcategory.name}
                                </option>
                              ))
                            : [])
                        ]).flat()}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Main categories and their subcategories are shown with indentation
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Price</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={product?.price}
                      onChange={(e) =>
                        setProduct({ ...product, price: Number(e.target.value) })
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Manufacturer</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={product?.manufacturer}
                      onChange={(e) =>
                        setProduct({ ...product, manufacturer: e.target.value })
                      }
                      placeholder="Enter manufacturer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                      value={product?.inStock}
                      onChange={(e) =>
                        setProduct({ ...product, inStock: Number(e.target.value) })
                      }
                    >
                      <option value={1}>In Stock</option>
                      <option value={0}>Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#5068a4] transition-colors duration-200">
                    <input
                      type="file"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5068a4] file:text-white hover:file:bg-[#3d5998]"
                      onChange={(e: any) => {
                        uploadFile(e.target.files[0]);
                        setProduct({ ...product, mainImage: e.target.files[0].name });
                      }}
                    />
                    {product?.mainImage && (
                      <div className="mt-4">
                        <Image
                          src={`/` + product?.mainImage}
                          alt={product?.title}
                          className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                          width={128}
                          height={128}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 h-32 resize-none"
                    value={product?.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    placeholder="Enter detailed product description..."
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={addProduct}
                    type="button"
                    className="bg-[#5068a4] hover:bg-[#3d5998] text-white px-12 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Add Product
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

export default AddNewProduct;
