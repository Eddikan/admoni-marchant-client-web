"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(query);

    const debounce = setTimeout(() => {
      onSearch(query);
    }, 500);
    return () => clearTimeout(debounce);
  }, [query, onSearch]);

  return (
    <div className="border flex items-center gap-2 rounded-lg px-3.5">
      <Image src="/icons/search.svg" alt="filter" width={15} height={16} />

      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border bg-transparent border-none focus:outline-none p-2 rounded-lg w-full"
      />
    </div>
  );
};

export default SearchBar;
