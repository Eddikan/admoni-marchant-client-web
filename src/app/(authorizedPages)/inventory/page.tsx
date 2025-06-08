/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DateRangePicker from "@/components/DateRangePicker";
import FiltersDropdown from "@/components/FiltersDropdown";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import TopCard from "@/components/TopCard";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import ModalWrapper from "@/components/ui/ModalWrapper";
import AddInventory from "@/components/inventory/AddInventory";
import TabSwitcher from "@/components/ui/TabSwitcher";
import {
  useGetProductCategoriesQuery,
  useGetMyProductsQuery,
} from "@/store/api/queries"; // Import the query
const ClientSideMenu = dynamic(
  () => import("@/components/inventory/InventorySideMenu"),
  { ssr: false }
);

// Mock Data

const generateMockData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    item: {
      image:
        i % 2 === 0
          ? "https://i.postimg.cc/fbC3MX5q/Rectangle-110.png"
          : "https://i.postimg.cc/7Y45dw3Z/Rectangle-92.png",
      name: `Item ${i + 1}`,
    },
    id: `GHT${i + 37}`,
    category: ["Beauty", "Electronics", "Fashion"][i % 3],
    price: `₦${Math.floor(Math.random() * 5000 + 1000).toLocaleString()}`,
    quantity: Math.floor(Math.random() * 100),
    itemsList: [
      {
        image: "https://i.postimg.cc/fbC3MX5q/Rectangle-110.png",
        name: "Perf",
        quantity: 1,
        price: 120.99,
      },
      {
        image: "https://i.postimg.cc/fbC3MX5q/Rectangle-110.png",
        name: "Perf",
        quantity: 1,
        price: 120.99,
      },
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
    statistics: {
      sold: Math.floor(Math.random() * 50),
      total: 54,
    },
    description: "Lorem ipsum dolor sit amet",
    status: Math.random() > 0.5,
    options: "Options Placeholder",
  }));
};

const mockData = generateMockData();

const headers = [
  {
    label: "Item",
    key: "item",
    render: (item: { image: string; name: string }) => (
      <div className="flex items-center gap-2">
        <img src={item.image} alt={item.name} className="w-8 h-8 rounded" />
        <span className="text-black font-medium text-sm">{item.name}</span>
      </div>
    ),
  },
  {
    label: "Item ID",
    key: "id",
    render: (id: string) => (
      <span className="text-black  text-xs font-bold">{id}</span>
    ),
  },
  {
    label: "Category",
    key: "category",
  },
  {
    label: "Price",
    key: "price",
    render: (price: string) => (
      <span className="text-black font-medium">{price}</span>
    ),
  },
  {
    label: "Quantity",
    key: "quantity",
  },
  {
    label: "Statistics",
    key: "statistics",
    render: (stats: { sold: number; total: number }) => {
      const percentage = (stats.sold / stats.total) * 100;
      return (
        <div className="flex flex-col items-start">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              style={{ width: `${percentage}%` }}
              className="bg-green-500 h-2 rounded-full"
            />
          </div>
          <span className="text-xs text-center  w-full text-gray-500">
            {stats.sold}/{stats.total}
          </span>
        </div>
      );
    },
  },
  {
    label: "Description",
    key: "description",
  },
  {
    label: "Status",
    key: "status",
    render: () => (
      <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" className="toggle-checkbox" />
        {/* <input
          type="checkbox"
          className="toggle-checkbox"
          checked={status}
          onChange={() => {}}
        /> */}
        <span className="toggle-slider"></span>
      </label>
    ),
  },
  {
    label: "",
    key: "options",
    render: () => (
      <Image
        alt="options"
        src="/icons/tripleIcons.svg"
        className="cursor-pointer"
        width={24}
        height={24}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },
];

const DashboardPage = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuData, setSideMenuData] = useState<any>(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch product categories
  const { data: categories } = useGetProductCategoriesQuery({
    limit: 20,
    page: 1,
  });

  // Fetch user's products
  const {
    data: myProducts,
    isLoading,
    error,
  } = useGetMyProductsQuery({
    limit: 10,
    page: currentPage,
    search: searchQuery, // Use search query
  },{
    refetchOnMountOrArgChange: true, // Refetch when component mounts or arguments change
  });

  useEffect(() => {
    if (myProducts) {
      console.log("My Products:", myProducts.data.products); // Log products for debugging
    }
    if (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [myProducts, error]);

  useEffect(() => {
    console.log("selected rows:", selectedRows);
  }, [selectedRows]);

  // Bind fetched products to filteredData
  const filteredData = myProducts.data.products || []; // Use fetched products

  const handleRowClick = (row: any) => {
    setSideMenuData(row);
    setSideMenuOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const headers = [
    {
      label: "Product Name",
      key: "product_name",
    },
    {
      label: "Price",
      key: "price",
      render: (price: number) => <span>₦{price.toLocaleString()}</span>,
    },
    {
      label: "Stock Quantity",
      key: "stock_quantity",
    },
    {
      label: "Featured Image",
      key: "featured_image",
      render: (image: string) => (
        <img src={image} alt="Featured" className="w-12 h-12 rounded" />
      ),
    },
    {
      label: "Created At",
      key: "createdAt",
      render: (date: string) => (
        <span>{new Date(date).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div className="sm:px-6">
      {/* Top Cards */}
      <div className="flex justify-between">
        <p className="text-3xl font-medium">Inventory</p>

        <Button onClick={() => setIsModalOpen(true)} icon="/icons/add.svg">
          Add New Inventory
        </Button>
      </div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <TopCard title="Total Inventory" content={myProducts?.pagination?.totalCount || "0"} />
        <TopCard title="Inventory Value" content="₦123,987" />
        <TopCard title="Active Stock" content="80,345" />
        <TopCard title="In-active Stock" content="12,234" />
        <TopCard title="Out of Stock" content="12,234" />
      </div>
      <div className="w-[500px]">
        <TabSwitcher
          tabs={[
            { id: "all", label: "All" },
            { id: "activeStock", label: "Active Stock" },
            { id: "inActiveStock", label: "In-active Stock" },
            { id: "outOfStock", label: "Out of Stock" },
          ]}
          activeTab={activeTab}
          onTabChange={(tab: string) => setActiveTab(tab)}
        />
      </div>

      <div className="border mt-8 border-grey-200 shadow rounded-lg py-4">
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
            rows={filteredData} // Bind filtered products to the table
            itemsPerPage={10}
            onSelect={(selectedRows) => setSelectedRows(selectedRows)}
            onRowClick={handleRowClick}
          />
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {myProducts?.pagination?.currentPage || 1} of{" "}
            {myProducts?.pagination?.pageCount || 1}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === myProducts?.pagination?.pageCount}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Side Menu */}
      <ClientSideMenu
        isOpen={sideMenuOpen}
        rowData={sideMenuData}
        onClose={() => setSideMenuOpen(false)}
      />

      <ModalWrapper
        title="Add New Inventory"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddInventory
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </ModalWrapper>
    </div>
  );
};

export default DashboardPage;
