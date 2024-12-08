import React, { useState } from "react";
import Image from "next/image";
const FiltersDropdown: React.FC = () => {
  const [selected, setSelected] = useState("Newest to Oldest");
  const [showPopup, setShowPopup] = useState(false);
  const options = ["Newest to Oldest", "Oldest to Newest"];

  const handleOverlayClick = () => {
    setShowPopup(false); // Close the popup when the overlay is clicked
  };

  return (
    <div className="relative  border border-[#D0D5DD] rounded-lg">
      {/* Trigger Button */}
      <button
        className="px-4 py-1.5 flex items-center gap-2 bg-gray-100 w-full rounded-lg text-gray-600"
        onClick={() => setShowPopup((prev) => !prev)}
      >
        <Image src="/icons/filter.svg" alt="filter" width={15} height={16} />
        {selected}
      </button>

      {/* Overlay */}
      {showPopup && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-25 z-40"
            onClick={handleOverlayClick}
          ></div>

          {/* Popup Content */}
          <div className="absolute z-50 bg-white shadow-lg p-2 rounded-lg mt-1">
            {options.map((option) => (
              <p
                key={option}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 text-gray-600"
                onClick={() => {
                  setSelected(option);
                  setShowPopup(false); // Close popup after selecting an option
                }}
              >
                {option}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FiltersDropdown;
