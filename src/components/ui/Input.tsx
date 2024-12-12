import React from "react";
import Image from "next/image";

interface InputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  name: string;
  type?: string;
  prepend?: boolean | string;
  showIncrement?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  name,
  prepend,
  showIncrement = false,
  type = "text",
}) => {
  const handleIncrement = () => {
    if (type === "number" && !isNaN(Number(value))) {
      const incrementedValue = (Number(value) + 1).toString();
      onChange({
        target: { name, value: incrementedValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDecrement = () => {
    if (type === "number" && !isNaN(Number(value))) {
      const decrementedValue = Math.max(0, Number(value) - 1).toString();
      onChange({
        target: { name, value: decrementedValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex w-full gap-2">
        <div className="flex flex-grow items-center border rounded p-2">
          {prepend && <div className="mr-2">{prepend}</div>}
          <input
            type={type}
            name={name}
            className="w-full px-1 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        </div>

        {showIncrement && type === "number" && (
          <div className="flex space-x-2 ml-2">
            <button
              type="button"
              onClick={handleDecrement}
              className="px-2 py-1 border rounded text-sm"
            >
              <Image
                alt="arrow"
                src="/icons/minus.svg"
                className=" cursor-pointer"
                width={20}
                height={20}
              />
            </button>
            <button
              type="button"
              onClick={handleIncrement}
              className="px-3 border rounded text-sm"
            >
              <Image
                alt="arrow"
                src="/icons/plus.svg"
                className=" cursor-pointer"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
