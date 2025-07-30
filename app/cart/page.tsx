"use client";

import {
  CustomButton,
  QuantityInput,
  QuantityInputCart,
  SectionTitle,
} from "@/components";
import Image from "next/image";
import React from "react";
import { FaCheck, FaClock, FaCircleQuestion, FaXmark } from "react-icons/fa6";
import { useProductStore } from "../_zustand/store";
import Link from "next/link";
import toast from "react-hot-toast";

const CartPage = () => {
  const { products, removeFromCart, calculateTotals, total } =
    useProductStore();

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    calculateTotals();
    toast.success("Product removed from the cart");
  };

  return (
    <div className="bg-[#FAF9EE] min-h-screen relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#5068a4] rounded-full opacity-20 float-element"></div>
      
      <SectionTitle title="Cart Page" path="Home | Cart" />
      <div className="bg-transparent relative z-10">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#5068a4] sm:text-4xl text-glow">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {products.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        width={192}
                        height={192}
                        src={product?.image ? `/${product.image}` : "/product_placeholder.jpg"}
                        alt="laptop image"
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`#`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </Link>
                            </h3>
                          </div>
                          {/* <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{product.color}</p>
                        {product.size ? (
                          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                        ) : null}
                      </div> */}
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <QuantityInputCart product={product} />
                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => handleRemoveItem(product.id)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <FaXmark className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {1 ? (
                          <FaCheck
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <FaClock
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        <span>{1 ? "In stock" : `Ships in 3 days`}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#5068a4] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-lg relative overflow-hidden"
            >
              {/* Circuit elements */}
              <div className="absolute top-4 right-4 w-12 h-0.5 bg-[#5068a4] opacity-20"></div>
              <div className="absolute bottom-4 left-4 w-8 h-0.5 bg-[#5068a4] opacity-15"></div>
              
              <h2
                id="summary-heading"
                className="text-lg font-bold text-[#5068a4] text-glow relative z-10"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${total}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <FaCircleQuestion
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <FaCircleQuestion
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${total / 5}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${total === 0 ? 0 : Math.round(total + total / 5 + 5)}
                  </dd>
                </div>
              </dl>
              {products.length > 0 && (
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="flex justify-center items-center w-full uppercase bg-[#5068a4] px-4 py-3 text-base border-2 border-[#5068a4] font-bold text-white shadow-lg hover:bg-white hover:text-[#5068a4] focus:outline-none focus:ring-2 focus:ring-[#5068a4] transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Checkout
                    </span>
                    {/* Circuit effects */}
                    <div className="absolute top-1/2 left-4 w-8 h-0.5 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-300 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-4 w-6 h-0.5 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -translate-y-1/2"></div>
                  </Link>
                </div>
              )}
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
