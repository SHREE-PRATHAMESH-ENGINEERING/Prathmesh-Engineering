"use client";
import { useUserStore } from "../_zustand/userStore";
import Link from "next/link";
import { FaBox } from "react-icons/fa";
import React, { useEffect, useState, useCallback } from "react";

const OrdersPage = () => {
  const { user, fetchUser } = useUserStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserOrders = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/user/${user.id}`);
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchUserOrders();
  }, [user?.id, fetchUserOrders]);

  if (!user?.id) {
    return (
      <div className="min-h-screen bg-[#FAF9EE] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-[#5068a4] rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#5068a4] mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your orders</p>
          <Link
            href="/login"
            className="btn-pcb-hero inline-flex items-center gap-x-2 px-6 py-3 rounded-full transition-all duration-300"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9EE]">
      <div className="pcb-hero-bg relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5068a4]/95 to-[#3d5998]/95"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 animate-scale">
              My Orders
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5068a4] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBox className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Orders</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchUserOrders}
              className="btn-pcb-hero px-6 py-2 rounded-full"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-[#5068a4] to-[#3d5998] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <FaBox className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-[#5068a4] mb-4">No Orders Placed Yet</h3>
            <p className="text-gray-600 mb-2 text-lg">Your order history is empty</p>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start your PCB manufacturing journey today! Browse our collection of high-quality PCBs and electronic components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/shop"
                className="btn-pcb-hero inline-flex items-center gap-x-2 px-8 py-4 rounded-full transition-all duration-300 text-lg font-semibold"
              >
                <FaBox className="text-sm" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg border-2 border-[#5068a4] border-opacity-10">
              <thead>
                <tr className="border-b-2 border-[#5068a4] border-opacity-20">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Country</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#5068a4] hover:bg-opacity-5 transition-colors duration-200">
                    <td className="py-3 px-4 font-semibold text-[#5068a4]">#{order.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{order.shippingAddress?.fullName || '-'}</td>
                    <td className="py-3 px-4 text-gray-500">{order.shippingAddress?.country || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md bg-blue-100 text-blue-800`}>{order.status}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">₹{order.totalAmount}</td>
                    <td className="py-3 px-4 text-gray-600">{order.createdAt ? new Date(order.createdAt).toDateString() : '-'}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/orders/${order.id}`}
                        className="bg-[#5068a4] bg-opacity-10 hover:bg-opacity-20 text-[#5068a4] px-2 py-1 rounded-md text-xs font-medium transition-all duration-200"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
