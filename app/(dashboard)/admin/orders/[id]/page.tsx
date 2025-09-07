"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description: string;
    manufacturer: string;
    inStock: number;
    categoryId: string;
  };
}

const AdminSingleOrder = () => {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>();
  type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
  interface Order {
    id: string;
    adress: string;
    apartment: string;
    company: string;
    dateTime: string;
    email: string;
    lastname: string;
    name: string;
    phone: string;
    postalCode: string;
    city: string;
    country: string;
    orderNotice: string;
    status: OrderStatus;
    total: number;
  }
  const [order, setOrder] = useState<Order>({
    id: "",
    adress: "",
    apartment: "",
    company: "",
    dateTime: "",
    email: "",
    lastname: "",
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    country: "",
    orderNotice: "",
    status: "processing",
    total: 0,
  });
  const params = useParams<{ id: string }>();

  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(
        `/api/orders/${params?.id}`
      );
      const data: Order = await response.json();
      setOrder(data);
    };

    const fetchOrderProducts = async () => {
      const response = await fetch(
        `/api/order-product/${params?.id}`
      );
      const data: OrderProduct[] = await response.json();
      setOrderProducts(data);
    };

    fetchOrderData();
    fetchOrderProducts();
  }, [params?.id]);

  const updateOrder = async () => {
    if (
      order?.name.length > 0 &&
      order?.lastname.length > 0 &&
      order?.phone.length > 0 &&
      order?.email.length > 0 &&
      order?.company.length > 0 &&
      order?.adress.length > 0 &&
      order?.apartment.length > 0 &&
      order?.city.length > 0 &&
      order?.country.length > 0 &&
      order?.postalCode.length > 0
    ) {
      if (!isValidNameOrLastname(order?.name)) {
        toast.error("You entered invalid name format");
        return;
      }

      if (!isValidNameOrLastname(order?.lastname)) {
        toast.error("You entered invalid lastname format");
        return;
      }

      if (!isValidEmailAddressFormat(order?.email)) {
        toast.error("You entered invalid email format");
        return;
      }

      fetch(`/api/orders/${order?.id}`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Order updated successfuly");
          } else {
            throw Error("There was an error while updating a order");
          }
        })
        .catch((error) =>
          toast.error("There was an error while updating a order")
        );
    } else {
      toast.error("Please fill all fields");
    }
  };

  const deleteOrder = async () => {
    const requestOptions = { method: "DELETE" };
    fetch(`/api/orders/${order?.id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Order deleted successfully");
          router.push("/admin/orders");
        } else {
          toast.error("Failed to delete order");
        }
      });
  };

  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 p-8 max-xl:p-4">
        <div className="mb-8 border-b-2 border-[#5068a4] border-opacity-20 pb-6">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">Order Details</h1>
          <p className="text-gray-700">View and edit order information</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 p-6">
          <div className="mb-6">
            <div className="bg-[#5068a4] bg-opacity-10 rounded-xl p-4 mb-6">
              <span className="text-lg font-bold text-[#5068a4]">Order ID: </span>
              <span className="text-lg font-semibold text-gray-800">#{order?.id}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.name}
                onChange={(e) => setOrder({ ...order, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.lastname}
                onChange={(e) => setOrder({ ...order, lastname: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.phone}
                onChange={(e) => setOrder({ ...order, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.email}
                onChange={(e) => setOrder({ ...order, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company (Optional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
              value={order?.company}
              onChange={(e) => setOrder({ ...order, company: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.adress}
                onChange={(e) => setOrder({ ...order, adress: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Apartment, Suite, etc.</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.apartment}
                onChange={(e) => setOrder({ ...order, apartment: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.city}
                onChange={(e) => setOrder({ ...order, city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.country}
                onChange={(e) => setOrder({ ...order, country: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                value={order?.postalCode}
                onChange={(e) => setOrder({ ...order, postalCode: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Order Status</label>
            <select
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
              value={order?.status}
              onChange={(e) =>
                setOrder({
                  ...order,
                  status: e.target.value as
                    | "processing"
                    | "shipped"
                    | "delivered"
                    | "cancelled",
                })
              }
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Order Notice</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 h-24 resize-none"
              value={order?.orderNotice || ""}
              onChange={(e) =>
                setOrder({ ...order, orderNotice: e.target.value })
              }
              placeholder="Add any special instructions or notes..."
            ></textarea>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-[#5068a4] border-opacity-20 pb-2">Order Items</h3>
            <div className="space-y-4">
              {orderProducts?.map((product) => (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl" key={product?.id}>
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={product?.product?.mainImage ? product?.product?.mainImage : "/product_placeholder.jpg"}
                      alt={product?.product?.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${product?.product?.slug}`} className="font-medium text-[#5068a4] hover:text-[#3d5998] transition-colors duration-200">
                      {product?.product?.title}
                    </Link>
                    <p className="text-gray-600">
                      ₹{product?.product?.price} × {product?.quantity} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#5068a4] bg-opacity-5 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Total Paid:</span>
                <span className="font-semibold">₹{order?.total}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-sm:flex-col">
            <button
              type="button"
              className="flex-1 bg-[#5068a4] hover:bg-[#3d5998] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={updateOrder}
            >
              Update Order
            </button>
            <button
              type="button"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={deleteOrder}
            >
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleOrder;
