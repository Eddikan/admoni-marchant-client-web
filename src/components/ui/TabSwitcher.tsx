import React from "react";

interface TabSwitcherProps {
  tabs: { id: string; label: string }[]; // Array of tab IDs and labels
  activeTab: string; // Currently active tab
  onTabChange: (tabId: string) => void; // Callback when a tab is clicked
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap border-b text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 p-2 text-center ${
            activeTab === tab.id
              ? "border-b-2 bg-green-100 border-green-500 font-bold"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
