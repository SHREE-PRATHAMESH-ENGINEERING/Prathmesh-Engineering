"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const { id: orderId } = params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          setError("Order not found");
        }
      } catch {
        setError("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9EE]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5068a4] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9EE]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <h2 className="text-2xl font-bold text-[#5068a4] mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "No details available for this order."}</p>
          <Link href="/orders" className="btn-pcb-hero px-6 py-3 rounded-full">Back to Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9EE]">

      <div className="pcb-hero-bg relative overflow-hidden py-12 mb-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5068a4]/95 to-[#3d5998]/95"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Order Details</h1>
            <p className="text-white/80 text-lg">Order <span className="font-semibold">#{order.id}</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
        <div className="mb-10">
          <OrderStatusProgress status={order.status} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-[#5068a4] mb-6">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <div><span className="font-semibold">Order ID:</span> {order.id}</div>
              <div><span className="font-semibold">Total Paid:</span> <span className="text-[#5068a4] font-bold">₹{order.total}</span></div>
              <div><span className="font-semibold">Date:</span> {order.dateTime ? new Date(order.dateTime).toLocaleString() : '-'}</div>
              <div><span className="font-semibold">Name:</span> {order.name} {order.lastname}</div>
              <div><span className="font-semibold">Email:</span> {order.email}</div>
              <div><span className="font-semibold">Phone:</span> {order.phone}</div>
              {order.company && <div><span className="font-semibold">Company:</span> {order.company}</div>}
              {order.orderNotice && <div><span className="font-semibold">Order Notice:</span> {order.orderNotice}</div>}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-[#5068a4] mb-6">Shipping Address</h2>
            <div className="space-y-3 text-gray-700">
              <div><span className="font-semibold">Address:</span> {order.adress}</div>
              {order.apartment && <div><span className="font-semibold">Apartment:</span> {order.apartment}</div>}
              <div><span className="font-semibold">City:</span> {order.city}</div>
              <div><span className="font-semibold">Postal Code:</span> {order.postalCode}</div>
              <div><span className="font-semibold">Country:</span> {order.country}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-[#5068a4] mb-8">Products in Order</h2>
          <div className="flex flex-col gap-6">
            {order.customer_order_product?.map((item: any) => (
              <div key={item.id} className="flex items-center bg-gray-50 rounded-xl p-4 shadow hover:shadow-lg transition-all">
                <Image
                  src={item.product?.mainImage || "/randomProductImage.svg"}
                  alt={item.product?.title || "Product"}
                  width={90}
                  height={90}
                  className="rounded object-cover mr-6 border"
                />
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.product?.title}</h4>
                    <div className="text-sm text-gray-600 mb-1">Quantity: <span className="font-semibold">{item.quantity}</span></div>
                    <div className="text-sm text-[#5068a4] font-medium mb-1">₹{item.product?.price?.toLocaleString()} each</div>
                  </div>
                  <div className="flex flex-col items-end md:items-center md:flex-row gap-2">
                    <div className="font-bold text-[#5068a4] text-lg">₹{(item.product?.price * item.quantity).toLocaleString()}</div>
                    <Link
                      href={`/product/${item.product?.slug}`}
                      className="text-xs text-[#5068a4] underline hover:text-[#3d5998]"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const ORDER_STEPS = ["Paid", "Processing", "Shipped", "Delivered"];

function getStepIndex(status: string) {
  if (status === "Cancelled") return -1;
  return ORDER_STEPS.findIndex(
    (step) => step.toLowerCase() === status.toLowerCase()
  );
}

const OrderStatusProgress = ({ status }: { status: string }) => {
  const currentStep = getStepIndex(status);
  const isCancelled = status.toLowerCase() === "cancelled";
  const stepIcons = [
    <svg key="paid" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="2" stroke="currentColor" fill="#e0e7ff"/>
      <rect x="7" y="15" width="2" height="2" rx="0.5" strokeWidth="2" stroke="currentColor" fill="#6366f1"/>
      <rect x="11" y="15" width="6" height="2" rx="0.5" strokeWidth="2" stroke="currentColor" fill="#e0e7ff"/>
      <path d="M17 9l-2.5 2.5L13 11" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="processing" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/><path stroke="currentColor" strokeWidth="2" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    <svg key="shipped" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="1" y="7" width="15" height="10" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/><rect x="16" y="11" width="5" height="6" rx="1" strokeWidth="2" stroke="currentColor" fill="none"/><circle cx="5.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/><circle cx="18.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor"/></svg>,
    <svg key="delivered" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path stroke="currentColor" strokeWidth="2" d="M8 12l2 2 4-4"/></svg>
  ];
  return (
    <div className="w-full mb-30 flex flex-col items-center">
      <div className="flex w-full justify-between items-center mb-2">
        {ORDER_STEPS.map((step, idx) => {
          const isActive = currentStep >= idx;
          return (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300
                  ${isActive ? 'bg-[#5068a4] border-[#5068a4] scale-110 shadow-lg' : 'bg-gray-200 text-gray-400 border-gray-300'}
                `}
                style={isActive ? { color: '#fff', filter: 'drop-shadow(0 2px 8px #1e293b)' } : { color: '#64748b' }}
              >
                <span className={isActive ? 'animate-bounce' : ''}>{stepIcons[idx]}</span>
              </div>
              <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${isActive ? 'text-[#1e293b] font-bold' : 'text-gray-400'}`}>{step}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full relative">
        {isCancelled ? (
          <div className="h-2 rounded-full bg-red-500 w-full transition-all duration-300"></div>
        ) : (
          <div
            className={`h-2 rounded-full bg-[#5068a4] transition-all duration-300`}
            style={{ width: currentStep >= 0 ? `${((currentStep + 1) / ORDER_STEPS.length) * 100}%` : '0%' }}
          ></div>
        )}
        {isCancelled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500 font-bold text-sm sm:text-md bg-[#FAF9EE] px-2 sm:px-4 md:px-6 rounded">Order Cancelled</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
