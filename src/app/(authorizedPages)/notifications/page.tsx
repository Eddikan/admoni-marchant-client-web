/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import DateRangePicker from "@/components/DateRangePicker";
import FiltersDropdown from "@/components/FiltersDropdown";
import SearchBar from "@/components/SearchBar";
import PaginatedNotifications from "@/components/notifications/PaginatedNotifications";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
const ClientSideMenu = dynamic(
  () => import("@/components/customer/CustomerSideMenu"),
  { ssr: false }
);

// Mock Data
const generateMockData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `customer-${i + 1}`,
    customer: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    phone: `+23480234${Math.floor(10000 + Math.random() * 89999)}`,
    gender: ["Male", "Female"][Math.floor(Math.random() * 2)],
    address: "123, Example Street, Lagos",
    totalItems: Math.floor(Math.random() * 50 + 1),
    totalAmount: `₦${Math.floor(Math.random() * 5000 + 1000).toLocaleString()}`,
    options: "Options Placeholder",
    deliveryType: "Shipping",
    itemsList: [
      {
        image: "https://i.postimg.cc/fbC3MX5q/Rectangle-110.png",
        name: "Perf",
        quantity: 1,
        price: 120.99,
      },
      {
        image: "https://i.postimg.cc/7Y45dw3Z/Rectangle-92.png",
        name: "Lens",
        quantity: 1,
        price: 120.99,
      },
      {
        image: "https://i.postimg.cc/fbC3MX5q/Rectangle-110.png",
        name: "Perf",
        quantity: 1,
        price: 120.99,
      },
    ],
  }));
};

const mockData = generateMockData();



const DashboardPage = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuData, setSideMenuData] = useState<any>(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    console.log("selected rows:", selectedRows);
  }, [selectedRows]);

  // Filter rows by search query
  const filteredData = mockData.filter((row) =>
    row.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowClick = (row: any) => {
    setSideMenuData(row);
    setSideMenuOpen(true);
  };

  return (
    <div className=" sm:px-6">
      {/* Top Cards */}
      <div className="flex justify-between">
        <p className=" text-3xl font-medium">Notifications</p>

        <Button onClick={() => alert("exported")} icon="/icons/export.svg">
          Export
        </Button>
      </div>
      <p className="mt-3 mb-6 font-medium text-base">25,000 Total Customers</p>

      <div className="border border-grey-200 shadow rounded-lg py-4">
        {/* Filters */}
        <div className="block sm:flex justify-between flex-col mx-6 sm:flex-row items-start sm:items-center gap-4 mb-6 ">
          <div className="block sm:flex col-span-6 gap-2">
            <div className="">
              <DateRangePicker />
            </div>

            <div className="my-5 sm:my-0">
              <FiltersDropdown />
            </div>
          </div>
          <div className="w-full sm:w-[30%]">
            <SearchBar
              onSearch={(query) => {
                setSearchQuery(query);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <PaginatedNotifications
            rows={filteredData}
            itemsPerPage={10}
            onSelect={(selectedRows) => setSelectedRows(selectedRows)}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {/* Side Menu */}
      <ClientSideMenu
        isOpen={sideMenuOpen}
        rowData={sideMenuData}
        onClose={() => setSideMenuOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
