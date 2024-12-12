"use client";
import React, { useState } from "react";
import TopCard from "@/components/TopCard";
import DateRangePicker from "@/components/DateRangePicker";
import WithdrawalModalContent from "@/components/wallet/WithdrawalModalContent";
import LinkModalContent from "@/components/wallet/LinkModalContent";

import ModalWrapper from "@/components/ui/ModalWrapper";

import Dropdown from "@/components/Dropdown";
import { Bar } from "react-chartjs-2";
import Button from "@/components/ui/Button";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | number>("Daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  // Generate the last 6 years
  const years = ["Daily", "Weekly"];

  // Chart data
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "#00A85A",

        borderColor: "#00A85A",
        borderWidth: 1,
        data: [30, 90, 120, 60, 30, 80, 100, 120, 50, 30, 60, 40],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Removes grid lines on the x-axis
        },
        ticks: {
          color: "#6B7280", // Optional: Customize tick label color
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false, // Removes grid lines on the y-axis
        },
        ticks: {
          color: "#6B7280", // Optional: Customize tick label color
          callback: function (value: number | string) {
            return value + "k"; // Adds 'k' suffix to each tick value
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  const transactions = [
    {
      status: "Successful",
      amount: 500000,
      time: "3:16:15PM",
      date: "Nov 27th",
      success: "Successful",
      color: "text-green-500",
    },
    {
      status: "Successful",
      amount: 500000,
      time: "3:16:15PM",
      date: "Nov 27th",
      success: "Successful",
      color: "text-green-500",
    },
    {
      status: "Failed",
      amount: 500000,
      time: "3:16:15PM",
      date: "Nov 27th",
      success: "Failed",
      color: "text-red-500",
    },
    {
      status: "Successful",
      amount: 500000,
      time: "3:16:15PM",
      date: "Nov 27th",
      success: "Successful",
      color: "text-green-500",
    },
    {
      status: "Successful",
      amount: 500000,
      time: "3:16:15PM",
      date: "Nov 27th",
      success: "Successful",
      color: "text-green-500",
    },
  ];

  return (
    <div className="p-6  min-h-screen">
      <div className="flex justify-between mb-6">
        <p className=" text-3xl font-medium">Wallet</p>

        <Button onClick={() => setIsLinkModalOpen(true)} icon="/icons/add.svg">
          Link New Account
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <TopCard title="Total Revenue" content="N22.5M" />
        <TopCard title="Total Withdrawn" content="N10.5m" />
        <TopCard title="Successful Withdrawal" content="50" />
        <TopCard title="Pending Withdrawal" content="9" />
        <TopCard title="Failed Withdrawal" content="2" />
      </div>
      <hr className="mb-6" />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 rounded-lg px-4 bg-white  shadow border border-grey-150 py-6 mt-2 sm:mt-0 block lg:flex items-center justify-between">
            <div className="flex flex-col gap-2 mb-2 sm:mb-0">
              <div className="text-base font-medium">Total Balance</div>
              <div className="text-adGreen-200 font-bold">N10,000,000</div>
            </div>
            <div>
              <Button
                onClick={() => setIsModalOpen(true)}
                icon="/icons/hand.svg"
              >
                Request Withdrawal
              </Button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="block lg:flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Revenue</h3>
              <div className="">
                <DateRangePicker />
              </div>
              <Dropdown
                options={years}
                selected={selectedYear}
                onSelect={setSelectedYear}
              />
            </div>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">Withdrawal History</h3>
          </div>

          <ul>
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-3 "
              >
                <div className="flex gap-3 items-center">
                  <Image
                    alt="bank"
                    src="/icons/gtb.png"
                    className=""
                    width={44}
                    height={44}
                  />
                  <div>
                    <p className="text-sm text-gray-600">
                      Withdrawal to Tony...
                    </p>
                    <p className="text-xs text-grey-350">
                      {transaction.date}, {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-800">
                    ₦{transaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium ${transaction.color}`}>
                    {transaction.success}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ModalWrapper
        title="Withdrawal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <WithdrawalModalContent onClose={() => setIsModalOpen(false)} />
      </ModalWrapper>
      <ModalWrapper
        title="Link Account"
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      >
        <LinkModalContent onClose={() => setIsLinkModalOpen(false)} />
      </ModalWrapper>
    </div>
  );
};

export default Dashboard;
