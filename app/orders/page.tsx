"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FaBox, FaClock, FaCheckCircle, FaTruck, FaEye, FaArrowLeft, FaTimes } from "react-icons/fa";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    title: string;
    mainImage: string;
    slug: string;
  };
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserOrders = useCallback(async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching orders for user:", session.user.email);

      // Try direct email-based approach first
      const directOrdersResponse = await fetch(`/api/orders/by-email?email=${encodeURIComponent(session.user.email)}`, {
        cache: "no-store",
      });

      if (directOrdersResponse.ok) {
        const ordersData = await directOrdersResponse.json();
        console.log("Orders data (direct):", ordersData);
        setOrders(ordersData);
        return;
      }

      // Fallback to original approach if direct method fails
      const userResponse = await fetch(`/api/users/email/${encodeURIComponent(session.user.email)}`, {
        cache: "no-store",
      });
      
      if (!userResponse.ok) {
        console.error("User fetch failed:", userResponse.status, userResponse.statusText);
        throw new Error("Failed to fetch user data");
      }
      
      const userData = await userResponse.json();
      console.log("User data:", userData);

      const ordersResponse = await fetch(`/api/orders/user/${userData.id}`, {
        cache: "no-store",
      });
      
      if (!ordersResponse.ok) {
        console.error("Orders fetch failed:", ordersResponse.status, ordersResponse.statusText);
        throw new Error("Failed to fetch orders");
      }
      
      const ordersData = await ordersResponse.json();
      console.log("Orders data (fallback):", ordersData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Error in fetchUserOrders:", err);
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "processing":
        return <FaBox className="text-green-500" />;
      case "shipped":
        return <FaTruck className="text-blue-500" />;
      case "delivered":
        return <FaCheckCircle className="text-blue-500" />;
      case "cancelled":
        return <FaTimes className="text-red-500" />;
      case "need urgent":
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800";
      case "need urgent":
      case "urgent":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!session) {
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
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale"
                style={{animationDelay: `${index * 0.1}s`}}
              >

                <div className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] text-white p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Order #{order.id.slice(-8).toUpperCase()}</h3>
                      <p className="text-white/80">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">Total Amount</p>
                        <p className="text-xl font-bold">₹{order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-[#5068a4] mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border">
                          <Image
                            src={item.product.mainImage || "/randomProductImage.svg"}
                            alt={item.product.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{item.product.title}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-[#5068a4] font-medium">₹{item.price.toLocaleString()} each</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#5068a4]">₹{(item.price * item.quantity).toLocaleString()}</p>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-[#5068a4] transition-colors duration-300"
                          >
                            <FaEye className="text-xs" />
                            View Product
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.shippingAddress && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <h5 className="font-semibold text-[#5068a4] mb-2">Shipping Address</h5>
                      <div className="text-sm text-gray-700">
                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
