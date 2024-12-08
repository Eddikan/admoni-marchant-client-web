import React from "react";

interface TopCardProps {
  title: string;
  content: string;
}

const TopCard: React.FC<TopCardProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col bg-white shadow-sm rounded-lg py-2 border border-[#EAECF0] text-center">
      <p className="text-grey-100 font-medium text-base mb-2">{title}</p>
      <p className="text-2xl font-semibold">{content}</p>
    </div>
  );
};

export default TopCard;
