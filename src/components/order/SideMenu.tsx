"use client"
import React from "react";

interface SideMenuProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, rowData, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} className="p-4 text-right">
        Close
      </button>
      <div className="p-6">
        <h2 className="text-lg font-bold">{`Order #${rowData?.id}`}</h2>
        {/* Dynamic content */}
        <p>{rowData?.details}</p>
      </div>
    </div>
  );
};

export default SideMenu;
