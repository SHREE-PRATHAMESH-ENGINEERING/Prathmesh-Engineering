import React from "react";
import ProductItem from "./ProductItem";
import prisma from "@/utils/db";

const Products = async ({ slug }: any) => {
  const searchQuery = slug?.searchParams?.search;
  
  if (searchQuery) {
    const searchConditions = [
      {
        title: {
          contains: searchQuery
        }
      },
      {
        description: {
          contains: searchQuery
        }
      },
      {
        slug: {
          contains: searchQuery
        }
      },
      {
        manufacturer: {
          contains: searchQuery
        }
      },
      {
        category: {
          name: {
            contains: searchQuery
          }
        }
      }
    ];

    const searchProducts = await prisma.product.findMany({
      where: {
        OR: searchConditions
      },
      include: {
        category: true
      },
      take: 50
    });

    const scoredProducts = searchProducts.map(product => {
      let score = 0;
      const queryLower = searchQuery.toLowerCase();
      const titleLower = product.title.toLowerCase();
      const descLower = (product.description || '').toLowerCase();
      const slugLower = product.slug.toLowerCase();
      const manufacturerLower = (product.manufacturer || '').toLowerCase();
      const categoryLower = (product.category?.name || '').toLowerCase();

      if (titleLower === queryLower) score += 100;
      else if (titleLower.includes(queryLower)) score += 50;
      
      if (slugLower === queryLower) score += 90;
      else if (slugLower.includes(queryLower)) score += 40;
      
      if (manufacturerLower === queryLower) score += 80;
      else if (manufacturerLower.includes(queryLower)) score += 35;
      
      if (categoryLower === queryLower) score += 70;
      else if (categoryLower.includes(queryLower)) score += 30;
      
      if (descLower.includes(queryLower)) score += 20;
      
      if (titleLower.startsWith(queryLower)) score += 25;
      if (manufacturerLower.startsWith(queryLower)) score += 15;
      if (categoryLower.startsWith(queryLower)) score += 15;
      
      return { ...product, searchScore: score };
    });

    const sortedProducts = scoredProducts
      .sort((a, b) => b.searchScore - a.searchScore)
      .map(({ searchScore, ...product }) => product);

    return (
      <div>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">
            Search Results for "{searchQuery}"
          </h3>
          <p className="text-blue-600 text-sm">
            Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} matching your search
          </p>
        </div>
        
        <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product: Product) => (
              <ProductItem key={product.id} product={product} color="black" />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No products found for "{searchQuery}"
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse our categories
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

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
