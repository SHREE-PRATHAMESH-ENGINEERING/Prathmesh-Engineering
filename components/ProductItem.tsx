import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="relative bg-[#FAF9EE] rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 animate-scale cursor-pointer">
        {/* PCB Circuit Border Effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5068a4] to-[#3d5998]"></div>
        
        {/* Product Image Container */}
        <div className="relative overflow-hidden p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={
              product.mainImage
                ? `/${product.mainImage}`
                : "/product_placeholder.jpg"
            }
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-[250px] object-cover rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
            alt={product?.title}
          />
          
          {/* Floating PCB Elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-[#5068a4] rounded-full opacity-60 group-hover:animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#00a86b] rounded-full opacity-40 group-hover:animate-pulse"></div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5068a4] transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-[#5068a4] group-hover:text-[#3d5998] transition-colors duration-300">
            ${product.price}
          </p>
          
          {/* Circuit Line Effect */}
          <div className="flex-1 mx-4 h-px bg-gradient-to-r from-transparent via-[#5068a4] to-transparent opacity-30"></div>
          
          <div className="text-sm text-gray-500 font-medium">
            PCB
          </div>
        </div>

          <div className="transform transition-all duration-300 group-hover:scale-105">
            <ProductItemRating productRating={product?.rating} />
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#5068a4] to-[#3d5998] text-white text-center py-3 px-6 rounded-xl font-bold uppercase text-sm tracking-wide transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:from-[#3d5998] group-hover:to-[#5068a4]">
            <span className="relative z-10">View Product</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-pulse"></div>
          </div>
        </div>
        
        {/* Subtle Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 20%, #5068a4 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
