"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  // function for modifying URL for searching products
  // After it we will grab URL on the search page and send GET request for searched products
  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?search=${searchInput}`);
    setSearchInput("");
  };

  return (
    <form className="flex w-full justify-center max-sm:px-2" onSubmit={searchProducts}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search PCBs, components..."
        className="bg-gray-50 input input-bordered w-[70%] rounded-l-3xl outline-none focus:outline-none max-sm:w-full max-sm:text-sm max-sm:px-3 max-[450px]:placeholder:text-xs"
      />
      <button type="submit" className="btn bg-[#5068a4] text-white rounded-r-3xl hover:bg-opacity-90 max-sm:px-4 max-sm:text-sm max-[450px]:px-2 max-[450px]:text-xs">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
