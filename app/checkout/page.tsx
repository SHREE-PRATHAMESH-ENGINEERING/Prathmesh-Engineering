"use client";
import { SectionTitle } from "@/components";
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "../_zustand/userStore";
import { isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import { isValidPostalCode, isValidPhoneNumber } from "@/lib/utils";
import Script from "next/script";
import { getShippingEstimate, getTaxEstimate } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
  });
  const { products, total, clearCart } = useProductStore();
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const router = useRouter();

  const country = "India";
  const deliveryType = "standard";
  const shippingEstimate = getShippingEstimate(country, deliveryType);
  const taxEstimate = getTaxEstimate(country, total);
  const finalTotal = Math.round(total + taxEstimate + shippingEstimate);

  const makePurchase = async () => {
    if (
      checkoutForm.name.length > 0 &&
      checkoutForm.lastname.length > 0 &&
      checkoutForm.phone.length > 0 &&
      checkoutForm.email.length > 0 &&
      checkoutForm.company.length > 0 &&
      checkoutForm.adress.length > 0 &&
      checkoutForm.apartment.length > 0 &&
      checkoutForm.city.length > 0 &&
      checkoutForm.country.length > 0 &&
      checkoutForm.postalCode.length > 0
    ) {
      if (!isValidNameOrLastname(checkoutForm.name)) {
        toast.error("You entered invalid format for name");
        return;
      }
      if (!isValidNameOrLastname(checkoutForm.lastname)) {
        toast.error("You entered invalid format for last name");
        return;
      }
      if (!isValidEmailAddressFormat(checkoutForm.email)) {
        toast.error("You entered invalid format for email address");
        return;
      }
      if (!isValidPhoneNumber(checkoutForm.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      if (!isValidPostalCode(checkoutForm.postalCode)) {
        toast.error("Please enter a valid 6-digit pincode");
        return;
      }

      try {
        const razorpayResponse = await fetch("/api/razorpay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalTotal,
            currency: "INR",
          }),
        });

        const razorpayData = await razorpayResponse.json();

        if (!razorpayResponse.ok) {
          toast.error("Failed to initialize payment");
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorpayData.amount,
          currency: "INR",
          name: "Shree Prathmesh Engineering",
          description: "Purchase from PCB & Electronic store",
          order_id: razorpayData.orderId,
          handler: async function (response: any) {

            try {
              const verifyResponse = await fetch("/api/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                await createOrder();
              } else {
                toast.error("Payment verification failed");
              }
            } catch (error) {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: checkoutForm.name,
            email: checkoutForm.email,
            contact: checkoutForm.phone,
          },
          theme: {
            color: "#5068a4",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        toast.error("Failed to initialize payment");
      }
    } else {
      toast.error("You need to enter values in the input fields");
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: checkoutForm.name,
          lastname: checkoutForm.lastname,
          phone: checkoutForm.phone,
          email: checkoutForm.email,
          company: checkoutForm.company,
          adress: checkoutForm.adress,
          apartment: checkoutForm.apartment,
          postalCode: checkoutForm.postalCode,
          status: "paid",
          total: finalTotal,
          city: checkoutForm.city,
          country: checkoutForm.country,
          orderNotice: checkoutForm.orderNotice,
          userId: user?.id || null,
        }),
      });

      const data = await response.json();
      const orderId: string = data.id;
      
      for (let i = 0; i < products.length; i++) {
        await addOrderProduct(orderId, products[i].id, products[i].amount);
      }

      setCheckoutForm({
        name: "",
        lastname: "",
        phone: "",
        email: "",
        company: "",
        adress: "",
        apartment: "",
        city: "",
        country: "",
        postalCode: "",
        orderNotice: "",
      });
      clearCart();
      toast.success("Order created successfully! Payment completed.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Failed to create order");
    }
  };

  const addOrderProduct = async (
    orderId: string,
    productId: string,
    productQuantity: number
  ) => {
    
    const response = await fetch("/api/order-product", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerOrderId: orderId,
        productId: productId,
        quantity: productQuantity,
      }),
    });
  };

  

  useEffect(() => {
    if (products.length === 0) {
      toast.error("You don't have items in your cart");
      router.push("/cart");
    }
  }, [products.length, router]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="bg-gradient-to-b from-[#f5f8ff] via-[#eaf1fb] to-white">
        <SectionTitle title="Checkout" path="Home | Cart | Checkout" />
      
      <div
        className="hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <main className="relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            >
              {products.map((product) => (
                <li
                  key={product?.id}
                  className="flex items-start space-x-4 py-6"
                >
                  <Image
                    src={product?.image}
                    alt={product?.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product?.title}</h3>
                    <p className="text-gray-500">x{product?.amount}</p>
                  </div>
                  <p className="flex-none text-base font-medium">
                    ₹{product?.price}
                  </p>
                  <p></p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">₹{shippingEstimate}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">₹{taxEstimate}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total Paid</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ₹{finalTotal}
                  </dd>
              </div>
            </dl>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="md:mt-12 text-sm font-medium text-gray-900 mb-3">Have a coupon code?</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="btn-pcb-hero px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
          </div>
        </section>

        <form className="px-4 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900"
              >
                Contact information
              </h2>


              <div className="mt-6 flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="name-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      value={checkoutForm.name}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          name: e.target.value,
                        })
                      }
                      type="text"
                      id="name-input"
                      name="name-input"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastname-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      value={checkoutForm.lastname}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          lastname: e.target.value,
                        })
                      }
                      type="text"
                      id="lastname-input"
                      name="lastname-input"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

                <div className="mt-6 flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="phone-input"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        value={checkoutForm.phone}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            phone: e.target.value,
                          })
                        }
                        type="tel"
                        id="phone-input"
                        name="phone-input"
                        autoComplete="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        value={checkoutForm.email}
                        onChange={(e) =>
                          setCheckoutForm({
                            ...checkoutForm,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  </div>
            </section>


            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-lg font-medium text-gray-900"
              >
                Shipping address
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.company}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House, street address, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.adress}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          adress: e.target.value,
                        })
                      }
                        required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area, Landmark, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.apartment}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          apartment: e.target.value,
                        })
                      }
                        required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.city}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          city: e.target.value,
                        })
                      }
                        required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.country}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          country: e.target.value,
                        })
                      }
                        required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={checkoutForm.postalCode}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          postalCode: e.target.value,
                        })
                      }
                        required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="order-notice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Any remarks
                  </label>
                  <div className="mt-1">
                    <textarea
                      className="textarea textarea-bordered textarea-lg w-full"
                      id="order-notice"
                      name="order-notice"
                      autoComplete="order-notice"
                      value={checkoutForm.orderNotice}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          orderNotice: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-10 mb-10 border-t border-gray-200 pt-6 ml-0">
              <button
                type="button"
                onClick={makePurchase}
                className="w-full btn-pcb-hero text-md py-4 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </main>
      </div>
    </>
  );
};

export default CheckoutPage;
