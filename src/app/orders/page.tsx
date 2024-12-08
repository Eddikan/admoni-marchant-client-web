/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TopCard from "@/components/TopCard";
import DateRangePicker from "@/components/DateRangePicker";
import FiltersDropdown from "@/components/FiltersDropdown";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import dynamic from "next/dynamic";
const ClientSideMenu = dynamic(
  () => import("@/components/order/OrderSideMenu"),
  { ssr: false }
);

// Mock Data
const generateMockData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `order-${i + 1}`,
    customer: `Customer ${i + 1}`,
    email: "imeekwere15@gmail.com",
    phone: +2348023499180,
    items: Math.floor(Math.random() * 50 + 1),
    totalAmount: `₦${Math.floor(Math.random() * 5000 + 1000).toLocaleString()}`,
    paymentMethod: ["Cash", "Bank Transfer", "POS"][
      Math.floor(Math.random() * 3)
    ],
    deliveryAddress: "Lorem ipsum dolor sit amet",
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
    deliveryType: ["Shipping", "Pickup"][Math.floor(Math.random() * 2)],
    dateOrdered: "12 Dec, 2020",
    deliveryDate: "14 Dec, 2020",
    status: ["Completed", "Pending", "Cancelled"][
      Math.floor(Math.random() * 3)
    ],
  }));
};

const mockData = generateMockData();

const headers = [
  {
    label: "Order ID",
    key: "id",

    render: (id: string) => (
      <span className="text-black font-medium">{id}</span>
    ),
  },
  { label: "Customer", key: "customer" },
  { label: "Number of Items", key: "items" },
  {
    label: "Total Amount",
    key: "totalAmount",

    render: (id: string) => (
      <span className="text-black font-medium">{id}</span>
    ),
  },
  { label: "Payment Method", key: "paymentMethod" },
  { label: "Delivery Type", key: "deliveryType" },
  { label: "Date Ordered", key: "dateOrdered" },
  { label: "Delivery Date", key: "deliveryDate" },
  {
    label: "Status",
    key: "status",
    render: (status: string) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-2xl ${
          status === "Completed"
            ? "bg-green-100 text-adGreen-200"
            : status === "Pending"
            ? "bg-yellow-100 text-adYellow-100"
            : "bg-red-100 text-adRed-100"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    label: "",
    key: "options",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (status: string) => (
      <Image
        alt="arrow"
        src="/icons/tripleIcons.svg"
        className="rotate-180 cursor-pointer"
        width={24}
        height={24}
      />
    ),
  },
];

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
    <div className=" sm:p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <TopCard title="Total Order" content="13,240" />
        <TopCard title="Total Amount Sold" content="₦123,987" />
        <TopCard title="Pending Orders" content="122" />
        <TopCard title="Completed Orders" content="12,234" />
      </div>
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
          <Table
            headers={headers}
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
