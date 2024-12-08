import React, { useState } from "react";
import Image from "next/image";
const DateRangePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleOverlayClick = () => {
    setIsOpen(false); // Close the popup when the overlay is clicked
  };

  return (
    <div className="relative border border-[#D0D5DD] rounded-lg">
      {/* Trigger Button */}
      <button
        className="flex items-center w-full gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/icons/calender.svg"
          alt="calender"
          width={15}
          height={16}
        />
        <span className="text-grey-300 font-semibold text-sm">
          {startDate || "Start Date"} - {endDate || "End Date"}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-25 z-40"
            onClick={handleOverlayClick}
          ></div>

          {/* Popup Content */}
          <div className="absolute z-50 bg-white shadow-lg p-4 rounded-lg">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label className="text-sm">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
