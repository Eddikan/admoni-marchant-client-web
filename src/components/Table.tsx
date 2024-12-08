/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
interface TableProps {
  headers: {
    label: string;
    key: string;
    render?: (value: any) => JSX.Element; // Optional custom render function
  }[];
  rows: any[]; // Data rows
  itemsPerPage: number; // Number of rows per page
  onSelect: (selectedRows: any[]) => void; // Callback for row selection
  onRowClick: (row: any) => void; // Callback for row click
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  itemsPerPage,
  onSelect,
  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  // Paginate rows
  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRowSelection = (row: any) => {
    const isSelected = selectedRows.includes(row);
    const updated = isSelected
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(updated);
    onSelect(updated);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      onSelect([]);
    } else {
      setSelectedRows(paginatedRows);
      onSelect(paginatedRows);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse border-b border-gray-300">
        <thead>
          <tr className="border-b border-gray-300 bg-grey-600 ">
            <th className="p-2 bg-gray-100 pl-6">
              <input
                type="checkbox"
                className="border border-grey-500 rounded"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            {headers.map((header) => (
              <th
                key={header.key}
                className="p-2 bg-gray-100 text-grey-400 text-xs"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, idx) => (
            <tr
              key={idx}
              className={`cursor-pointer  ${
                idx % 2 === 0 ? "bg-adGreen-100" : "bg-white"
              } hover:bg-green-100 border-b border-gray-300`}
              onClick={() => onRowClick(row)}
            >
              {/* Wrap the checkbox in a container */}
              <td className="p-2 pl-6 py-6">
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click event
                  }}
                >
                  <input
                    type="checkbox"
                    className="border border-grey-500 rounded"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRowSelection(row)}
                  />
                </div>
              </td>
              {headers.map((header) => (
                <td key={header.key} className="p-2 text-center">
                  {header.render ? (
                    header.render(row[header.key]) // Use custom template if provided
                  ) : (
                    <span className="text-grey-400 text-sm">
                      {row[header.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
