/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
interface TableProps {
  rows: any[]; // Data rows
  itemsPerPage: number; // Number of rows per page
  onSelect: (selectedRows: any[]) => void; // Callback for row selection
  onRowClick: (row: any) => void; // Callback for row click
}

const Table: React.FC<TableProps> = ({ rows, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  // Paginate rows
  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {paginatedRows.map((row, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4  rounded-lg "
        >
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Image
              alt="arrow"
              src="/icons/notification.svg"
              width={32}
              height={32}
            />
            <div>
              <p className="font-medium text-sm text-gray-800">Notification</p>
              <p className="text-sm text-grey-400">
                You have a new order #83298 for Chinenye Okoli
              </p>
            </div>
          </div>

          {/* Right section */}
          <p className="text-sm text-gray-400">10 days ago</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="mx-6 flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 flex gap-2 border border-grey-500 items-center  rounded-lg"
          disabled={currentPage === 1}
        >
          <Image alt="arrow" src="/icons/arrow.svg" width={11} height={12} />
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 ${
                currentPage === index + 1
                  ? "bg-adGreen-300 text-adGreen-200"
                  : "bg-white text-grey-400"
              } rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 flex gap-2 border border-grey-500 items-center  rounded-lg"
          disabled={currentPage === totalPages}
        >
          Next
          <Image
            alt="arrow"
            src="/icons/arrow.svg"
            className="rotate-180"
            width={11}
            height={12}
          />
        </button>
      </div>
    </div>
  );
};

export default Table;
