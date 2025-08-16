"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import Link from "next/link";

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?limit=4");
        if (res.ok) {
          setProducts(await res.json());
        } else {
          setProducts([]);
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-10 px-0 md:px-12 bg-gradient-to-b from-[#f5f8ff] via-[#eaf1fb] to-white border-t-4 border-[#5068a4] relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
      <div className="max-w-screen-2xl pb-20 mx-auto relative z-10 animate-fadeInUp">
        <div className="mb-12">
          <Heading title="FEATURED PRODUCTS" />
        </div>
        {loading ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-8 py-12 shadow-xl max-w-md mx-auto">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-[#5068a4] mb-2">Loading featured products...</h3>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
            {products.map((product: Product, index: number) => (
              <div
                key={product.id}
                className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
              >
                <ProductItem product={product} color="white" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-8 py-12 shadow-xl max-w-md mx-auto">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-[#5068a4] mb-2">Products Coming Soon</h3>
              <p className="text-blue-700 mb-6">We&apos;re preparing our latest PCB solutions for you.</p>
              <Link href="/contact">
                <button className="btn-pcb-hero px-6 py-2 text-sm">
                  CONTACT US
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;
