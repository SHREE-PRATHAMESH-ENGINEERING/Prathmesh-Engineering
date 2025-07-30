import React from "react";
import CategoryItem from "./CategoryItem";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";

const CategoryMenu = () => {
  return (
    <div className="py-10 bg-[#FAF9EE] relative">
      
      <div className="text-animate">
        <Heading title="PCB CATEGORIES" />
      </div>
      <div className="max-w-screen-2xl mx-auto py-16 gap-6 px-16 max-md:px-10 grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1 relative z-10">
        {categoryMenuList.map((item, index) => (
          <div 
            key={item.id}
            className="animate-scale h-full"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationFillMode: 'both'
            }}
          >
            <CategoryItem title={item.title} href={item.href}>
              <div className="text-3xl filter drop-shadow-md">
                {item.icon}
              </div>
            </CategoryItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
