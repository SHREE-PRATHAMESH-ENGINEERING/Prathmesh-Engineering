"use client";
import { DashboardSidebar } from "@/components";
import React, {useState, useEffect} from "react";
import { FaShoppingBag, FaUsers, FaChartLine } from "react-icons/fa";
import { FaRupeeSign, FaReceipt } from "react-icons/fa";

const AdminDashboardPage = () => {

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();
      setOrders(ordersData);
      const usersRes = await fetch("/api/users");
      const usersData = await usersRes.json();
      setUsers(usersData);
      const productsRes = await fetch("/api/products?mode=admin");
      const productsData = await productsRes.json();
      setProducts(productsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalOrders = orders.length;
  const totalCustomers = users.length;

  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">

        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Dashboard Overview</h1>
          <p className="text-gray-700">Welcome back! Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-10">Total Revenue</p>
                <p className="text-2xl font-bold text-[#5068a4]">₹{loading ? "..." : orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-[#5068a4] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaRupeeSign className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-[#5068a4]">{loading ? "..." : totalOrders}</p>
                <div className="flex flex-col mt-2">
                  <span className="text-gray-500 text-sm">Pending: <span className="font-bold text-[#5068a4]">{loading ? "..." : orders.filter((o: any) => o.status?.toLowerCase() === "paid").length}</span></span>
                  <span className="text-gray-500 text-sm">Processing: <span className="font-bold text-[#5068a4]">{loading ? "..." : orders.filter((o: any) => o.status?.toLowerCase() === "processing").length}</span></span>
                  <span className="text-gray-500 text-sm">Delivered: <span className="font-bold text-[#5068a4]">{loading ? "..." : orders.filter((o: any) => o.status?.toLowerCase() === "delivered").length}</span></span>
                  <span className="text-gray-500 text-sm">Shipped: <span className="font-bold text-[#5068a4]">{loading ? "..." : orders.filter((o: any) => o.status?.toLowerCase() === "shipped").length}</span></span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#5068a4] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaReceipt className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-[#5068a4]">{loading ? "..." : products.length}</p>
                <div className="flex flex-col mt-2">
                  <span className="text-gray-500 text-sm">In Stock: <span className="font-bold text-[#5068a4]">{loading ? "..." : products.filter((p: any) => p.inStock > 0).length}</span></span>
                  <span className="text-gray-500 text-sm">No Stock: <span className="font-bold text-[#5068a4]">{loading ? "..." : products.filter((p: any) => !p.inStock || p.inStock === 0).length}</span></span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#5068a4] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaShoppingBag className="text-[#5068a4] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 hover:border-opacity-30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-10">Total Customers</p>
                <p className="text-2xl font-bold text-[#5068a4]">{loading ? "..." : totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-[#3d5998] bg-opacity-10 rounded-full flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <FaUsers className="text-[#3d5998] text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 p-8 mt-8">
          <h2 className="text-xl font-bold text-[#5068a4] mb-6">Top Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">By Number of Sales</h3>
              <ul>
                {loading ? (
                  <li>Loading...</li>
                ) : (
                  (Object.entries(
                    orders.reduce((acc: Record<string, number>, order: any) => {
                      order.customer_order_product?.forEach((op: any) => {
                        acc[String(op.product.id)] = (acc[String(op.product.id)] || 0) + (op.quantity || 0);
                      });
                      return acc;
                    }, {})
                  ) as [string, number][])
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([productId, sales], idx) => {
                      const product: any = products.find((p: any) => String(p.id) === productId);
                      return product ? (
                        <li key={productId} className="mb-2 flex items-center gap-x-3">
                          <span className="font-bold text-[#5068a4]">{idx + 1}.</span>
                          <span>{product.title || product.name || 'Unnamed Product'}</span>
                          <span className="ml-auto text-gray-600">{sales} sold</span>
                          <a
                            href={`/product/${product.slug || product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-3 py-1 bg-[#5068a4] text-white rounded hover:bg-[#3b4e7e] transition"
                          >
                            View
                          </a>
                        </li>
                      ) : null;
                    })
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">By Revenue</h3>
              <ul>
                {loading ? (
                  <li>Loading...</li>
                ) : (
                  (Object.entries(
                    orders.reduce((acc: Record<string, number>, order: any) => {
                      order.customer_order_product?.forEach((op: any) => {
                        const revenue = (op.product.price || 0) * (op.quantity || 0);
                        acc[String(op.product.id)] = (acc[String(op.product.id)] || 0) + revenue;
                      });
                      return acc;
                    }, {})
                  ) as [string, number][])
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([productId, revenue], idx) => {
                      const product: any = products.find((p: any) => String(p.id) === productId);
                      return product ? (
                        <li key={productId} className="mb-2 flex items-center gap-x-3">
                          <span className="font-bold text-[#5068a4]">{idx + 1}.</span>
                          <span>{product.title || product.name || 'Unnamed Product'}</span>
                          <span className="ml-auto text-gray-600">₹{Number(revenue).toLocaleString()}</span>
                          <a
                            href={`/product/${product.slug || product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-3 py-1 bg-[#5068a4] text-white rounded hover:bg-[#3b4e7e] transition"
                          >
                            View
                          </a>
                        </li>
                      ) : null;
                    })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
