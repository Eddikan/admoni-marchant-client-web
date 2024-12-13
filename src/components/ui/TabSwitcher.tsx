import React from "react";

interface TabSwitcherProps {
  tabs: { id: string; label: string }[]; // Array of tab IDs and labels
  activeTab: string; // Currently active tab
  onTabChange: (tabId: string) => void; // Callback when a tab is clicked
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-wrap text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 min-w-max p-2 text-center sm:flex-none sm:px-4 sm:py-2 md:px-6 md:py-3 ${
            activeTab === tab.id
              ? "border-b-2 bg-green-100 border-green-500 text-adGreen-200 font-medium"
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
