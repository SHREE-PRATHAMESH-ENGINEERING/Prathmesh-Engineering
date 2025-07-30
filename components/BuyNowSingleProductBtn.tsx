"use client";
import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BuyNowSingleProductBtn = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const router = useRouter();
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Product added to the cart");
    router.push("/checkout");
  };
  return (
    <button
      onClick={handleAddToCart}
      className="btn w-[200px] text-lg border-2 border-[#5068a4] font-bold bg-[#5068a4] text-white hover:bg-white hover:scale-105 hover:text-[#5068a4] transition-all duration-300 uppercase ease-in max-[500px]:w-full relative overflow-hidden group"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        Buy Now
      </span>
      {/* Circuit effect on hover */}
      <div className="absolute top-1/2 left-2 w-8 h-0.5 bg-white opacity-40 group-hover:opacity-0 transition-opacity duration-300 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-2 w-6 h-0.5 bg-white opacity-30 group-hover:opacity-0 transition-opacity duration-300 transform -translate-y-1/2"></div>
    </button>
  );
};

export default BuyNowSingleProductBtn;
