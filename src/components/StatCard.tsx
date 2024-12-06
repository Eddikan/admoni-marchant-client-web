import React from "react";
import Image from "next/image";

interface StatCardProps {
  title: string;
  amount: string;
  bottomText: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount }) => {
  return (
    <div className="bg-white border border-[#EAECF0] shadow rounded-lg p-3 flex flex-col items-start">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{amount}</p>
      <div className="flex justify-between items-end w-full">
        <p className=" text-sm ">
          <span className="text-green-500">↑</span>

          <span className="text-[#027A48] ml-1">40%</span>
          <span className="ml-1 text-[#667085]">vs last month</span>
        </p>

        <Image src="/icons/chart.png" alt="chart" width={62} height={48} />
      </div>
    </div>
  );
};

export default StatCard;
