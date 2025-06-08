import { useState } from "react";
import Image from "next/image";

interface BankDropdownProps {
  options: { id: string; name: string; icon?: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  title?: string;
  loading?: boolean; // Add loading prop
}

const BankDropdown = ({
  options,
  title = "Select Bank",
  value,
  onChange,
  error,
  loading = false, // Default loading to false
}: BankDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.name === value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <label className="block mb-1 font-medium">{title}</label>
      <div
        className={`flex items-center justify-between w-full border rounded-lg p-3 cursor-pointer ${
          loading ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={!loading ? toggleDropdown : undefined} // Disable toggle if loading
      >
        {loading ? (
          <span className="text-gray-500">Loading...</span> // Show loading text
        ) : selectedOption ? (
          <div className="flex items-center gap-3">
            {selectedOption.icon && (
              <Image
                src={selectedOption.icon}
                alt={selectedOption.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{selectedOption.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">{title}</span>
        )}
        {!loading && (
          <Image
            src="/icons/chevronDown.svg"
            alt="Toggle"
            width={16}
            height={16}
            className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </div>
      {isOpen && !loading && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-25 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <ul className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-md">
            {options.map((option) => (
              <li
                key={option.id}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option.id ?? option.name)}
              >
                {option.icon && (
                  <Image
                    src={option.icon}
                    alt={option.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default BankDropdown;
