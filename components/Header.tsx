"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { mainNavigation } from "@/lib/utils";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getWishlistByUserId = useCallback(async (id: string) => {
    const response = await fetch(`/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug:string;
      stockAvailabillity: number;
    }[] = [];
    wishlist.map((item: any) => productArray.push({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock
    }));
    setWishlist(productArray);
  }, [setWishlist]);

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      fetch(`/api/users/email/${encodeURIComponent(session?.user?.email)}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  }, [session?.user?.email, getWishlistByUserId]);

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length, getUserByEmail]);

  return (
    <header className="bg-white border-b-2 border-[#5068a4] relative">
      
      <HeaderTop />
      
      <div className="h-0.5 bg-[#5068a4]"></div>
      
      {pathname.startsWith("/admin") === false && (
        <div className="h-32 bg-transparent flex items-center justify-between px-16 max-[1320px]:px-12 max-lg:px-6 max-md:px-4 max-sm:px-2 max-lg:flex-col max-lg:gap-y-4 max-lg:justify-center max-lg:h-auto max-lg:py-4 max-w-screen-2xl mx-auto relative z-10">
          <Link href="/" className="group relative max-lg:order-1">
            <Image
              src="/logo v1 svg.svg"
              width={200}
              height={200}
              alt="Shree Prathmesh Engineering - PCB Manufacturing"
              className="relative right-5 max-[1023px]:w-56 max-md:w-48 max-sm:w-40 max-sm:right-2 "
            />

            <div className="absolute inset-0 -m-2 border border-[#5068a4] rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Link>
          
          <div className="flex-1 max-w-2xl mx-8 max-lg:order-3 max-lg:mx-0 max-lg:w-full max-md:max-w-full">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, categories, manufacturers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-4 pr-12 border-2 border-[#5068a4] rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3d5998] focus:ring-2 focus:ring-[#5068a4] focus:ring-opacity-20 transition-all duration-300 max-sm:h-10 max-sm:text-sm max-sm:pl-3 max-sm:pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#5068a4] hover:bg-[#3d5998] rounded-full flex items-center justify-center transition-all duration-300 group max-sm:w-8 max-sm:h-8"
                >
                  <FaSearch className="text-white text-sm group-hover:scale-110 transition-transform duration-300 max-sm:text-xs" />
                </button>
              </div>
            </form>
          </div>
          
          <div className="flex gap-x-10 items-center max-lg:order-2 max-md:gap-x-6 max-sm:gap-x-4">
            <div className="relative group">
              <HeartElement wishQuantity={wishQuantity} />

              <div className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-[#5068a4] transform -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 max-sm:w-4"></div>
            </div>
            <div className="relative group">
              <CartElement />
              
              <div className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-[#5068a4] transform -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 max-sm:w-4"></div>
            </div>
          </div>
        </div>
      )}

      {pathname.startsWith("/admin") === false && (
        <nav className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] border-t border-white border-opacity-20">
          <div className="max-w-screen-2xl mx-auto px-16 max-[1320px]:px-12 max-lg:px-6 max-md:px-4 max-sm:px-2">
            <div className="flex justify-center items-center h-14 max-sm:h-12">
              <ul className="flex items-center gap-x-12 max-lg:gap-x-8 max-md:gap-x-6 max-sm:gap-x-4">
                {mainNavigation.map((item) => (
                  <li key={item.id} className="relative group">
                    <Link 
                      href={item.href}
                      className="flex items-center gap-x-2 text-white font-medium hover:text-[#FAF9EE] transition-all duration-300 py-4 max-sm:py-3 max-sm:text-sm group"
                    >
                      <span className="relative">
                        {item.name}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FAF9EE] transition-all duration-300 group-hover:w-full"></div>
                      </span>
                      {item.megaMenu && (
                        <FaChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </Link>
                    
                    {item.megaMenu && item.subItems && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white shadow-2xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-2">
                        <div className="p-6">
                          <h3 className="text-[#5068a4] font-bold text-lg mb-4 border-b border-gray-200 pb-2">
                            PCB Types
                          </h3>
                          <ul className="space-y-1">
                            {item.subItems.map((subItem, index) => (
                              <li key={index}>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center text-gray-700 hover:text-[#5068a4] hover:bg-gray-50 p-2 rounded-md transition-all duration-200 group/sub"
                                >
                                  <span className="font-medium">{subItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}

      {pathname.startsWith("/admin") === true && (
        <div className="flex justify-between h-32 bg-transparent items-center px-16 max-[1320px]:px-10 max-lg:px-6 max-md:px-4 max-sm:px-2 max-w-screen-2xl mx-auto max-sm:h-24 relative z-10">
          <Link href="/" className="group relative">
            <Image
              src="/logo v1 svg.svg"
              width={130}
              height={130}
              alt="Shree Prathmesh Engineering - PCB Manufacturing"
              className="w-56 h-auto max-lg:w-48 max-md:w-40 max-sm:w-32 transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
            />

            <div className="absolute inset-0 -m-2 border border-[#5068a4] rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Link>
          <div className="flex gap-x-5 items-center max-sm:gap-x-3">
            <FaBell className="text-xl max-sm:text-lg hover:text-[#5068a4] transition-colors duration-300 cursor-pointer" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10 max-sm:w-8">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full hover:scale-110 transition-transform duration-300"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-sm:w-40 max-sm:right-0"
              >
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
