import React, { ReactNode } from "react";
import Image from "next/image";

interface ButtonProps {
  onClick?: () => void;
  icon?: string;
  loading?: boolean;
  children: ReactNode;
  block?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  onClick,
  icon,
  loading = false,
  block,
  children,
  type
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-[#00A85A] text-white font-medium rounded-md ${
        loading ? " opacity-50 cursor-not-allowed " : " hover:bg-[#008e4d] "
      } ${block ? " w-full " : ""}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
          ></path>
        </svg>
      ) : (
        icon && <Image alt="arrow" src={icon} width={20} height={20} />
      )}
      <span>{children}</span>
    </button>
  );
}
