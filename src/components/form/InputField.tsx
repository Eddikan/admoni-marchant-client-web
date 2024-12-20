import React, { useState } from "react";
import Image from "next/image";
interface InputFieldProps {
  label: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="relative  mb-6">
      {/* Use htmlFor to associate label with the input */}
      <label
        htmlFor={label} // Associate the label with the input via its id
        className={`absolute bg-white left-3 cursor-text top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 z-10 ${
          isFocused || value ? "-top-1 text-xs text-green-600" : "text-base"
        }`}
      >
        {label}
      </label>
      <div className="flex z-0 items-center border overflow-hidden border-gray-300 rounded-lg px-3 py-2 focus-within:border-green-600 transition-all">
        <input
          id={label} // Unique id that matches the htmlFor attribute
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          className="flex-1 border-none outline-none bg-white text-gray-700 placeholder-transparent"
        />
        {type === "password" && (
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 ml-2"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
                       <div className="relative h-[24px]  w-[24px]">
                       <Image alt="arrow" src="/icons/eye.svg" className="" fill />
                     </div>
            ) : (
                "🕳️"
       
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
