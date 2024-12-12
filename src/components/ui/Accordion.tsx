import React, { useState } from "react";
import Image from "next/image";

const Accordion = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`transition-all duration-300 ${isOpen ? "pb-4" : "pb-2"}`}>
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-green-600 font-medium">{title}</h3>
        <span
          className={`text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0 "
          }`}
        >
          {isOpen ? (
            <Image
              alt="options"
              src="/icons/accordionMinus.svg"
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Image
              alt="options"
              src="/icons/accordionPlus.svg"
              className="cursor-pointer"
              width={24}
              height={24}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="text-gray-500 text-sm">
          <p className="font-semibold mb-1">Description</p>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
