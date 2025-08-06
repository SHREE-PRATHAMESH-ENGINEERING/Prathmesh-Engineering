"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?mode=admin", {cache: "no-store"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">All Products</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-[#5068a4] hover:bg-[#3d5998] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            Add New Product
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
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(products) && products.map((product) => (
              <tr key={nanoid()} className="hover:bg-[#5068a4] hover:bg-opacity-5 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="w-4 h-4 text-[#5068a4] rounded focus:ring-[#5068a4]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-200">
                        <Image
                          width={48}
                          height={48}
                          src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                          alt={product?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product?.title}</div>
                        <div className="text-sm text-gray-500">{product?.manufacturer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {product?.category ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.category.name}
                          </div>
                          {(product.category as any).parent && (
                            <div className="text-xs text-gray-500">
                              Under: {(product.category as any).parent.name}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No category</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {product?.inStock ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">₹{product?.price}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/products/${product.id}`}
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
  );
};

export default DashboardProductTable;
