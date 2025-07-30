import React from "react";
import ProductItem from "./ProductItem";
import prisma from "@/utils/db";

const Products = async ({ slug }: any) => {
  // getting all data from URL slug and preparing everything for sending GET request
  const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

  let stockMode: string = "lte";
  
  // preparing inStock and out of stock filter for GET request
  // If in stock checkbox is checked, stockMode is "equals"
  if (inStockNum === 1) {
    stockMode = "equals";
  }
 // If out of stock checkbox is checked, stockMode is "lt"
  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
   // If in stock and out of stock checkboxes are checked, stockMode is "lte"
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
   // If in stock and out of stock checkboxes aren't checked, stockMode is "gt"
  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  // Use Prisma directly instead of fetch since we're in a server component
  const pageSize = 12;
  const skip = (page - 1) * pageSize;
  
  // Build filter conditions
  let whereClause: any = {};
  
  // Price filter
  const priceMax = slug?.searchParams?.price || 3001;
  whereClause.price = { lte: parseFloat(priceMax) };
  
  // Rating filter
  const ratingMin = Number(slug?.searchParams?.rating) || 0;
  if (ratingMin > 0) {
    whereClause.rating = { gte: ratingMin };
  }
  
  // Stock filter
  if (stockMode === "equals") {
    whereClause.inStock = { equals: 1 };
  } else if (stockMode === "lt") {
    whereClause.inStock = { lt: 1 };
  } else if (stockMode === "lte") {
    whereClause.inStock = { lte: 1 };
  } else if (stockMode === "gt") {
    whereClause.inStock = { gt: 0 };
  }
  
  // Category filter
  if (slug?.params?.slug?.length > 0) {
    whereClause.categoryId = slug.params.slug;
  }
  
  // Get products with filters
  const products = await prisma.product.findMany({
    where: whereClause,
    take: pageSize,
    skip: skip,
    include: {
      category: true
    },
    orderBy: { id: 'desc' }
  });

  /*
    const req = await fetch(
    `/api/products?populate=*&filters[price][$lte]=${
      searchParams?.price || 1000
    }${searchParams.women === "true" ? "&filters[category][$eq]=women" : ""}${searchParams.womenNewEdition === "true" ? "&filters[category][$eq]=women%20new%20edition" : ""}&filters[rating][$gte]=${
      searchParams?.rating || 1
    }`
  );
  const products = await req.json();
  */
  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;
