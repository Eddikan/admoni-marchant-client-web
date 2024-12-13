"use client";
import React, { useEffect, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import Image from "next/image";

const HelpPage = () => {
  const data = Array.from({ length: 100 }, (_, index) => ({
    title: `What is in Order Catalogue ${index + 1}`,
    description: `This is the description for Order Catalogue ${
      index + 1
    }. It tests your ability to quickly memorize visual information. Random characters (letters and numbers) are shown briefly before flipping. Correct entries earn points.`,
  }));

  const [search, setSearch] = useState(""); // Search input value
  const [filteredData, setFilteredData] = useState(data); // Filtered list of items

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() === "") {
        setFilteredData(data); // Reset to full list if search is empty
      } else {
        const filtered = data.filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filtered);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler); // Cleanup timeout on input change
  }, [search, data]);

  return (
    <div className=" mx-auto min-h-screen">
      <h1 className="text-3xl font-medium mb-16">Help</h1>
      <div className="border border-grey-200 px-6 py-4 rounded-lg">
        <div className="border w-1/3 flex items-center gap-2 rounded-lg px-3.5 mb-4 ">
          <Image src="/icons/search.svg" alt="filter" width={15} height={16} />

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border bg-transparent border-none focus:outline-none p-2 rounded-lg w-full"
          />
        </div>
        <div className=" rounded-lg shadow-md overflow-y-scroll max-h-[80vh] space-y-2 p-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                description={item.description}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
