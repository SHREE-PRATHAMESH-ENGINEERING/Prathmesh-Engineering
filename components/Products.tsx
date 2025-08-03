import React from "react";
import ProductItem from "./ProductItem";
import prisma from "@/utils/db";

const Products = async ({ slug }: any) => {

  const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

  let stockMode: string = "lte";
  
  if (inStockNum === 1) {
    stockMode = "equals";
  }

  if (outOfStockNum === 1) {
    stockMode = "lt";
  }

  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }

  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  const pageSize = 12;
  const skip = (page - 1) * pageSize;
  
  let whereClause: any = {};
  
  const priceMax = slug?.searchParams?.price || 3001;
  whereClause.price = { lte: parseFloat(priceMax) };
  
  const ratingMin = Number(slug?.searchParams?.rating) || 0;
  if (ratingMin > 0) {
    whereClause.rating = { gte: ratingMin };
  }
  
  if (stockMode === "equals") {
    whereClause.inStock = { equals: 1 };
  } else if (stockMode === "lt") {
    whereClause.inStock = { lt: 1 };
  } else if (stockMode === "lte") {
    whereClause.inStock = { lte: 1 };
  } else if (stockMode === "gt") {
    whereClause.inStock = { gt: 0 };
  }
  
  if (slug?.params?.slug?.length > 0) {
    if (Array.isArray(slug.params.slug)) {
      whereClause.categoryId = { in: slug.params.slug };
    } else {
      whereClause.categoryId = slug.params.slug;
    }
  } else if (slug?.searchParams?.categoryId) {
    whereClause.categoryId = slug.searchParams.categoryId;
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    take: pageSize,
    skip: skip,
    include: {
      category: true
    },
    orderBy: { id: 'desc' }
  });

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
