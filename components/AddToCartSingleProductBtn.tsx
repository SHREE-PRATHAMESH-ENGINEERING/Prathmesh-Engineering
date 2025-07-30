"use client";

import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";

const AddToCartSingleProductBtn = ({ product, quantityCount } : SingleProductBtnProps) => {
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount
    });
    calculateTotals();
    toast.success("Product added to the cart");
  };
  return (
    <button
      onClick={handleAddToCart}
      className="btn w-[200px] text-lg border-2 border-[#5068a4] font-bold bg-white text-[#5068a4] hover:bg-[#5068a4] hover:text-white hover:border-[#5068a4] hover:scale-105 transition-all duration-300 uppercase ease-in max-[500px]:w-full relative overflow-hidden group"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5M7 13l-1.5 7.5M7 13h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m8 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v4z" />
        </svg>
        Add to cart
      </span>
      {/* Circuit effect on hover */}
      <div className="absolute top-1/2 left-2 w-8 h-0.5 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-300 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-2 w-6 h-0.5 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -translate-y-1/2"></div>
    </button>
  );
};

export default AddToCartSingleProductBtn;
