"use client";
import { CustomButton, DashboardSidebar, SectionTitle } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";

interface DashboardProductDetailsProps {
  params: { id: number };
}

const DashboardProductDetails = ({
  params: { id },
}: DashboardProductDetailsProps) => {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const router = useRouter();

  // functionality for deleting product
  const deleteProduct = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 204) {
          if (response.status === 400) {
            toast.error(
              "Cannot delete the product because of foreign key constraint"
            );
          } else {
            throw Error("There was an error while deleting product");
          }
        } else {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting product");
      });
  };

  // functionality for updating product
  const updateProduct = async () => {
    if (
      product?.title === "" ||
      product?.slug === "" ||
      product?.price.toString() === "" ||
      product?.manufacturer === "" ||
      product?.description === ""
    ) {
      toast.error("You need to enter values in input fields");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error("There was an error while updating product");
        }
      })
      .then((data) => toast.success("Product successfully updated"))
      .catch((error) => {
        toast.error("There was an error while updating product");
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
        if (product) {
          setProduct({ ...product, mainImage: data.url }); 
        }
      } else {
        toast.error("File upload unsuccessful.");
      }
    } catch (error) {
      console.error("There was an error while during request sending:", error);
      toast.error("There was an error during request sending");
    }
  };

  const fetchProductData = React.useCallback(async () => {
    try {
      const productRes = await fetch(`/api/products/${id}`);
      const productData = await productRes.json();
      setProduct(productData);

      const imagesRes = await fetch(`/api/images/${id}`, { cache: "no-store" });
      const imagesData = await imagesRes.json();
      setOtherImages(imagesData);
    } catch (error) {
      toast.error("Error fetching product data");
    }
  }, [id]);

  const fetchCategories = async () => {
    fetch(`/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCategories([]);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id, fetchProductData]);

  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">
        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Product Details</h1>
          <p className="text-gray-700">Edit and manage product information</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={product?.title || ""}
                onChange={(e) =>
                  setProduct({ ...product!, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Price (₹)</label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={product?.price || 0}
                onChange={(e) =>
                  setProduct({ ...product!, price: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Manufacturer</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={product?.manufacturer || ""}
                onChange={(e) =>
                  setProduct({ ...product!, manufacturer: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={product?.slug ? convertSlugToURLFriendly(product.slug) : ""}
                onChange={(e) =>
                  setProduct({
                    ...product!,
                    slug: convertSlugToURLFriendly(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                value={product?.inStock ?? 1}
                onChange={(e) => {
                  setProduct({ ...product!, inStock: Number(e.target.value) });
                }}
              >
                <option value={1}>In Stock</option>
                <option value={0}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                value={product?.categoryId || ""}
                onChange={(e) =>
                  setProduct({
                    ...product!,
                    categoryId: e.target.value,
                  })
                }
              >
                <option value="">Select a category</option>
                {Array.isArray(categories) && categories
                  .filter(category => !category.parentId) // Only show main categories first
                  .map(category => [
                    <option key={category.id} value={category.id}>
                      {formatCategoryName(category.name)}
                    </option>,
                    // Add subcategories indented
                    ...(category.subcategories && Array.isArray(category.subcategories) 
                      ? category.subcategories.map(subcategory => (
                          <option key={subcategory.id} value={subcategory.id}>
                            └ {formatCategoryName(subcategory.name)}
                          </option>
                        ))
                      : [])
                  ]).flat()}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Main categories and their subcategories are shown with indentation
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#5068a4] transition-colors duration-200">
              <input
                type="file"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5068a4] file:text-white hover:file:bg-[#3d5998]"
                onChange={(e: any) => {
                  uploadFile(e.target.files[0]);
                }}
              />
              {product?.mainImage && (
                <div className="mt-4">
                  <Image
                    src={product?.mainImage}
                    alt={product?.title}
                    className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                    width={128}
                    height={128}
                  />
                </div>
              )}
            </div>
          </div>

          {otherImages && otherImages.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Other Images</label>
              <div className="flex gap-4 flex-wrap">
                {otherImages.map((image) => (
                  <Image
                    src={`/${image.image}`}
                    key={nanoid()}
                    alt="Product image"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 h-32 resize-none"
              value={product?.description || ""}
              onChange={(e) =>
                setProduct({ ...product!, description: e.target.value })
              }
              placeholder="Enter detailed product description..."
            ></textarea>
          </div>

          <div className="flex gap-4 max-sm:flex-col mb-6">
            <button
              type="button"
              onClick={updateProduct}
              className="flex-1 bg-[#5068a4] hover:bg-[#3d5998] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Update Product
            </button>
            <button
              type="button"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={deleteProduct}
            >
              Delete Product
            </button>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> To delete this product, you must first remove all its records from orders (customer_order_product table).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
