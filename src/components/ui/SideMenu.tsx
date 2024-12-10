/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accepts children to be rendered within the side menu
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0000004D] bg-opacity-25 z-40"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-[90vw] overflow-auto sm:w-[40vw] h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0 z-50" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Children Section */}
        <div className="p-6 space-y-4">{children}</div>
      </div>
    </>
  );
};

export default SideMenu;
