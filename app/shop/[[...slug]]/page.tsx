export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
} from "@/components";
import React from "react";

const improveCategoryText = (text: string): string => {
  if (text.indexOf("-") !== -1) {
    let textArray = text.split("-");

    return textArray.join(" ");
  } else {
    return text;
  }
};

const ShopPage = (slug: any) => {
  const searchQuery = slug?.searchParams?.search;
  
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (slug?.params?.slug && slug?.params?.slug[0]?.length > 0) {
      return improveCategoryText(slug?.params?.slug[0]);
    } else {
      return "All products";
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#eaf1fb] to-[#f5f8ff] relative overflow-hidden">
      <div className="absolute inset-0 pcb-pattern opacity-10 pointer-events-none"></div>
      <div className="max-w-screen-2xl mx-auto px-10 max-sm:px-5 relative z-10">
        <Breadcrumb />
        <div className="grid grid-cols-[220px_1fr] gap-x-10 max-md:grid-cols-1 max-md:gap-y-5">
          <Filters />
          <div>
            <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-y-5">
              <h2 className="text-2xl font-bold text-[#5068a4] max-sm:text-xl max-[400px]:text-lg uppercase drop-shadow">
                {getPageTitle()}
              </h2>
              <SortBy />
            </div>
            <div className="divider"></div>
            <div className=" p-6">
              <Products slug={slug} />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
