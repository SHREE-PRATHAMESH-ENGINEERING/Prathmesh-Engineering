"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { FaSearch, FaRegUser, FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaPhone, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import OrdersElement from "./OrdersElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { mainNavigation, socialMediaIcons } from "@/lib/utils";

const Header = () => {
  // Profile dropdown state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  // Close profile dropdown on scroll
  useEffect(() => {
    if (!showProfileDropdown) return;
    const handleScroll = () => setShowProfileDropdown(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProfileDropdown]);
  
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      FaPhone,
      FaWhatsapp,
      FaLinkedin,
      FaInstagram,
      FaTwitter,
      FaFacebook,
      FaEnvelope
    };
    return iconMap[iconName];
  };

  const getWishlistByUserId = useCallback(async (id: string) => {
    // Don't make API call if id is undefined or null
    if (!id) {
      console.warn('No user ID provided for wishlist fetch');
      setWishlist([]);
      return;
    }

    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const wishlist = await response.json();
      const productArray: {
        id: string;
        title: string;
        price: number;
        image: string;
        slug:string;
        stockAvailabillity: number;
      }[] = [];
      
      // Ensure wishlist is an array before mapping
      if (Array.isArray(wishlist)) {
        wishlist.map((item: any) => productArray.push({
          id: item?.product?.id,
          title: item?.product?.title,
          price: item?.product?.price,
          image: item?.product?.mainImage,
          slug: item?.product?.slug,
          stockAvailabillity: item?.product?.inStock
        }));
      }
      setWishlist(productArray);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    }
  }, [setWishlist]);

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch(`/api/users/email/${encodeURIComponent(session?.user?.email)}`, {
          cache: "no-store",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Only call getWishlistByUserId if we have a valid user ID
        if (data?.id) {
          getWishlistByUserId(data.id);
        } else {
          console.warn('No user ID returned from API');
          setWishlist([]);
        }
      } catch (error) {
        console.error('Error fetching user by email:', error);
        setWishlist([]); 
      }
    }
  }, [session?.user?.email, getWishlistByUserId, setWishlist]);

  useEffect(() => {
    // Only fetch user data if we have a valid session with email
    if (session?.user?.email) {
      getUserByEmail();
    } else {
      // Clear wishlist if no valid session
      setWishlist([]);
    }
  }, [session?.user?.email, getUserByEmail, setWishlist]);

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
      <header className="bg-white relative">
      
        <div className="h-16 text-[#5068a4] bg-[#162040]  max-lg:h-auto max-lg:py-3 max-sm:hidden relative overflow-hidden border-b border-gray-200">
        
        <div className="absolute top-1/2 left-1/4 w-12 h-0.5 bg-[#5068a4] opacity-10 animate-pulse max-sm:hidden"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-0.5 bg-[#5068a4] opacity-15 animate-pulse max-sm:hidden" style={{animationDelay: '1s'}}></div>
        
        <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-y-2 max-w-screen-2xl mx-auto px-6 relative z-10">
          
          <div className="flex items-center gap-x-5 ml-auto h-full max-lg:h-auto max-md:gap-x-3 font-semibold">
            {!session ? (
              <>
                <Link href="/login" className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] px-2 py-1 rounded transition-all duration-300 text-[#5068a4]">
                  <FaRegUser className="text-white transition-all duration-300 group-hover:scale-110 " />
                  <span className="transition-all text-white duration-300">Login</span>
                </Link>
                <Link href="/register" className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] px-2 py-1 rounded transition-all duration-300 text-[#5068a4]">
                  <FaRegUser className="text-white transition-all duration-300 group-hover:scale-110 " />
                  <span className="transition-all text-white duration-300 ">Register</span>
                </Link>
              </>
            ) : (
              <button
                className="flex items-center gap-x-2 font-semibold group hover:bg-[#5068a4] p-3 rounded transition-all duration-300 text-[#5068a4] focus:outline-none"
                onClick={() => setShowProfileDropdown(prev => !prev)}
                aria-label="Profile"
              >
                <FaRegUser className="text-white transition-all duration-300 group-hover:scale-110 " />
              </button>
            )}
            {session && showProfileDropdown && typeof window !== "undefined" && ReactDOM.createPortal(
              <div style={{ position: 'fixed', top: '70px', right: '40px', zIndex: 9999 }} className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fadeIn">
                <div className="text-gray-700 text-sm break-all">{session.user?.email}</div>
                <button
                  onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                  className="mt-4 w-full bg-[#5068a4] text-white py-2 rounded-lg font-semibold hover:bg-[#3d5998] transition-all duration-300"
                >
                  Log out
                </button>
              </div>, document.body
            )}
          </div>
        </div>
      </div>
      
      {pathname.startsWith("/admin") === false && (
        <>
          <div className="h-32 bg-transparent flex md:flex-row items-center justify-between px-16 max-[1320px]:px-12 max-lg:px-6 max-md:px-4 max-lg:flex-col max-lg:gap-y-4 max-lg:justify-center max-lg:h-auto max-lg:py-4 max-w-screen-2xl mx-auto relative z-10 max-md:hidden">
              <div className="flex justify-start px-4 lg:px-0 w-full lg:w-auto">
              <Link href="/" className="group relative">
              <Image
                src="/logo v1 svg.svg"
                width={200}
                height={200}
                alt="Shree Prathmesh Engineering - PCB Manufacturing"
                className="relative right-5 max-[1023px]:w-56 max-md:w-48"
              />
              <div className="absolute inset-0 -m-2 border border-[#5068a4] rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8 max-lg:order-2 max-lg:mx-0 max-lg:w-full max-md:max-w-full hidden lg:block">
              <form onSubmit={handleSearch} className="relative group">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products, categories, manufacturers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 border-2 border-[#5068a4] rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3d5998] focus:ring-2 focus:ring-[#5068a4] focus:ring-opacity-20 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#5068a4] hover:bg-[#3d5998] rounded-full flex items-center justify-center transition-all duration-300 group"
                  >
                    <FaSearch className="text-white text-sm group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            </div>

              <div className="flex gap-x-6 items-center max-lg:order-2 max-md:gap-x-6 px-4 lg:px-0">
              <HeartElement wishQuantity={wishQuantity} />
              <OrdersElement />
              <CartElement />
            </div>
          </div>

            <div className="w-full border-t-2 border-[#5068a4] py-4 justify-center hidden md:flex lg:hidden">
              <div className="searchbar-2 max-w-2xl w-full">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products, categories, manufacturers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-4 pr-12 border-2 border-[#5068a4] rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3d5998] focus:ring-2 focus:ring-[#5068a4] focus:ring-opacity-20 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#5068a4] hover:bg-[#3d5998] rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <FaSearch className="text-white text-sm group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              </div>
            </div>


          <div className="hidden max-md:block bg-white px-4 py-3 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Link href="/" className="group relative">
                <Image
                  src="/logo v1 svg.svg"
                  width={160}
                  height={160}
                  alt="Shree Prathmesh Engineering - PCB Manufacturing"
                  className="w-32 h-auto"
                />
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 bg-[#5068a4] hover:bg-[#3d5998] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#5068a4] to-[#3d5998] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                {isMobileMenuOpen ? (
                  <FaTimes className="text-white text-lg relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <FaBars className="text-white text-lg relative z-10 group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 border-2 border-[#5068a4] rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3d5998] focus:ring-2 focus:ring-[#5068a4] focus:ring-opacity-20 transition-all duration-300 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#5068a4] hover:bg-[#3d5998] rounded-full flex items-center justify-center transition-all duration-300 group"
                >
                  <FaSearch className="text-white text-xs group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </form>
          </div>

          {isMobileMenuOpen && (
            <div className="hidden max-md:block fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="bg-white w-90 h-full shadow-2xl overflow-y-auto animate-slideInLeft" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#5068a4] to-[#3d5998]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Menu</h2>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      <FaTimes className="text-white text-sm group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-6">
                  <div className="space-y-3">
                    {!session ? (
                      <>
                        <Link 
                          href="/login" 
                          className="flex items-center gap-x-3 p-3 bg-[#5068a4] bg-opacity-10 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaRegUser className="text-[#5068a4] text-lg" />
                          <span className="text-[#5068a4] font-medium">Login</span>
                        </Link>
                        <Link 
                          href="/register" 
                          className="flex items-center gap-x-3 p-3 bg-[#5068a4] bg-opacity-10 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaRegUser className="text-[#5068a4] text-lg" />
                          <span className="text-[#5068a4] font-medium">Register</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-[#5068a4] font-medium text-sm">{session.user?.email}</span>
                        </div>
                        <button 
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-x-3 p-3 bg-red-50 rounded-lg w-full"
                        >
                          <FaRegUser className="text-red-600 text-lg" />
                          <span className="text-red-600 font-medium">Log out</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[#5068a4] font-semibold text-lg border-b border-[#5068a4] border-opacity-20 pb-2">Navigation</h3>
                    <div className="space-y-2">
                      {mainNavigation.map((item, index) => (
                        <div key={item.id} className="group">
                          <Link
                            href={item.href}
                            className="flex items-center justify-between p-3 text-[#5068a4] hover:bg-gray-500 hover:bg-opacity-10 rounded-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-md transform"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center gap-x-3">
                              <div className="w-2 h-2 text-[#5068a4] group-hover:scale-150 transition-transform duration-300"></div>
                              <span className="text-gray-700 group-hover:text-[#5068a4] font-medium transition-colors duration-300">
                                {item.name}
                              </span>
                            </div>
                            {item.megaMenu && (
                              <FaChevronDown className="text-[#5068a4] text-sm group-hover:rotate-180 transition-transform duration-300" />
                            )}
                          </Link>
                          
                          {item.megaMenu && item.subItems && (
                            <div className="ml-6 mt-2 space-y-1 border-l-2 border-[#5068a4] border-opacity-20 pl-4">
                              {item.subItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block p-2 text-gray-600 hover:text-[#5068a4] hover:bg-[#5068a4] hover:bg-opacity-5 rounded-md transition-all duration-200 text-sm transform hover:translate-x-1"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="flex items-center gap-x-2">
                                    <div className="w-1 h-1 bg-[#5068a4] rounded-full opacity-60"></div>
                                    {subItem.name}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[#5068a4] font-semibold text-lg border-b border-[#5068a4] border-opacity-20 pb-2">Quick Actions</h3>
                    <div 
                      className="flex items-center gap-x-3 p-3 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-105 group"
                      onClick={() => {
                        window.location.href = '/wishlist';
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                        <HeartElement wishQuantity={wishQuantity} />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium block">Wishlist</span>
                        <span className="text-gray-500 text-sm">{wishQuantity} items saved</span>
                      </div>
                      <FaChevronDown className="text-gray-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div 
                      className="flex items-center gap-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-105 group"
                      onClick={() => {
                        window.location.href = '/orders';
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                        <OrdersElement />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium block">Orders</span>
                        <span className="text-gray-500 text-sm">Track your orders</span>
                      </div>
                      <FaChevronDown className="text-gray-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div 
                      className="flex items-center gap-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 transform hover:scale-105 group"
                      onClick={() => {
                        window.location.href = '/cart';
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                        <CartElement />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 font-medium block">Cart</span>
                        <span className="text-gray-500 text-sm">Review your items</span>
                      </div>
                      <FaChevronDown className="text-gray-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </>
      )}

      {pathname.startsWith("/admin") === false && (
          <nav className="bg-gradient-to-r bg-[#5068a4] border-b-2 border-b-white max-sm:hidden">
          <div className="max-w-screen-2xl mx-auto px-16 max-[1320px]:px-12 max-lg:px-6 max-md:px-4">
            <div className="flex justify-center items-center h-14">
              <ul className="flex items-center gap-x-12 max-lg:gap-x-8 max-md:gap-x-6">
                {mainNavigation.map((item) => (
                  <li key={item.id} className="relative group">
                    <Link 
                      href={item.href}
                      className="flex items-center gap-x-2 text-white font-medium hover:text-[#FAF9EE] transition-all duration-300 py-4 group"
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
                            Types
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
              className="w-56 h-auto max-lg:w-48 max-md:w-40 max-sm:w-32 transition-all duration-300 group-hover:scale-105 filter"
            />

            <div className="absolute inset-0 -m-2 border border-[#5068a4] rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Link>
          
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
