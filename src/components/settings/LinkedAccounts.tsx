/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import LinkAccount from "@/components/wallet/LinkAccount";

export default function LinkedAccounts() {
  const [searchQuery, setSearchQuery] = useState("");
  // Updated Headers
  const headers = [
    {
      label: "Bank",
      key: "bank",
      render: (bank:{
        logo:string,
        name:string
      }) => (
        <div className="flex items-center gap-2">
          <Image
            src="/icons/gtb.png"
            alt="gtb"
            className=" rounded"
            width={44}
            height={44}
          />
          <span className="text-black font-medium text-sm">{bank.name}</span>
        </div>
      ),
    },
    {
      label: "Account Number",
      key: "accountNumber",
      render: (accountNumber:string) => (
        <span className="text-black font-medium text-sm">{accountNumber}</span>
      ),
    },
    {
      label: "Account Name",
      key: "accountName",
      render: (accountName:string) => (
        <span className="text-black font-medium text-sm">{accountName}</span>
      ),
    },
    {
      label: "Set Status",
      key: "status",
      render: (status:string) => (
        <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" className="toggle-checkbox" />
          <span className="toggle-slider"></span>
        </label>
      ),
    },
    {
      label: "",
      key: "delete",
      render: () => (

        <Image
        src="/icons/bin.svg"
        alt="gtb"
        className=" rounded"
        width={24}
        height={24}
      />
     
      ),
    },
  ];

  // Updated Mock Data Generator
  const generateMockData = () => {
    return Array.from({ length: 5 }, (_, i) => ({
      bank: {
        logo: "https://via.placeholder.com/32", // Replace with the actual bank logo URL
        name: "Guaranty Trust Bank Plc",
      },
      accountNumber: "1234567898767",
      accountName: `Tony Tones`,
      status: i % 2 === 0, // Toggle status alternates between true and false
    }));
  };

  const mockData = generateMockData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const filteredData = mockData.filter((row) =>
    row.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    console.log("selected", selectedRows);
  }, [selectedRows]);
  return (
    <div className=" shadow rounded-lg py-4">
      {/* Filters */}
      <div className="block sm:flex justify-between flex-col mx-6 sm:flex-row items-start sm:items-center gap-4 mb-6 ">
        <div className="w-full sm:w-[30%]">
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
        </div>
        <LinkAccount />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          headers={headers}
          rows={filteredData}
          itemsPerPage={10}
          onSelect={(selectedRows) => setSelectedRows(selectedRows)}
        />
      </div>
    </div>
  );
}
