
"use client";
import { ProductItem, SectionTitle } from "@/components";
import React, { useEffect, useState } from "react";

interface Props {
  searchParams: { search: string };
}

const SearchPage = ({ searchParams: { search } }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?query=${search}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div>
      <SectionTitle title="Search Page" path="Home | Search" />
      <div className="max-w-screen-2xl mx-auto">
        {search && (
          <h3 className="text-4xl text-center py-10 max-sm:text-3xl">
            Showing results for {search}
          </h3>
        )}
        {loading ? (
          <h3 className="text-2xl text-center py-10">Loading...</h3>
        ) : (
          <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
