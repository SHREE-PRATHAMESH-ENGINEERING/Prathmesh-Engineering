"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getStatusBadgeClass = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    switch (normalizedStatus) {
      case 'processing':
        return 'bg-green-500 text-white shadow-green-200';
      case 'cancelled':
        return 'bg-red-500 text-white shadow-red-200';
      case 'delivered':
        return 'bg-blue-500 text-white shadow-blue-200';
      case 'need urgent':
        return 'bg-yellow-500 text-black shadow-yellow-200';
      default:
        return 'bg-gray-500 text-white shadow-gray-200';
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">All Orders</h2>
        <p className="text-gray-600">Track and manage customer orders</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#5068a4] border-opacity-20">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <input type="checkbox" className="w-4 h-4 text-[#5068a4] rounded focus:ring-[#5068a4]" />
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders &&
              orders.map((order) => (
                <tr key={order?.id} className="hover:bg-[#5068a4] hover:bg-opacity-5 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="w-4 h-4 text-[#5068a4] rounded focus:ring-[#5068a4]" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#5068a4]">#{order?.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{order?.name}</div>
                      <div className="text-sm text-gray-500">{order?.country}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${getStatusBadgeClass(order?.status)}`}>
                      {order?.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">₹{order?.total}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-600">{new Date(Date.parse(order?.dateTime)).toDateString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/orders/${order?.id}`}
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
    </div>
  );
};

export default AdminOrders;
