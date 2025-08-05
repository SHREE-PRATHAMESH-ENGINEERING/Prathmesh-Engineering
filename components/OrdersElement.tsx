"use client";
import Link from "next/link";
import React from "react";
import { FaClipboardList } from "react-icons/fa6";

const OrdersElement = () => {
  return (
    <div className="relative">
      <Link href="/orders">
        <FaClipboardList className="text-2xl text-black hover:text-[#5068a4] transition-colors duration-300" />
      </Link>
    </div>
  );
};

export default OrdersElement;
