"use client";
import React, { useState } from "react";
import StatCard from "@/components/StatCard";
import Dropdown from "@/components/Dropdown";
import { Bar, Line } from "react-chartjs-2";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedYear, setSelectedYear] = useState<any>(
    new Date().getFullYear()
  );

  // Generate the last 6 years
  const years = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - i
  );

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

  const lineData = {
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
        label: "Revenue",
        fill: true, // Fill the area under the line
        backgroundColor: "#94F395", // Gradient under the line
        borderColor: "#00A85A", // Line color
        borderWidth: 3,
        tension: 0.4, // Smooth curve for the line
        data: [40, 50, 100, 60, 80, 110, 90, 120, 80, 60, 100, 90],
        pointRadius: 0, // Removes the dots (set radius to 0)
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
  const lineChartOptions = {
    plugins: {
      legend: {
        display: false, // Hides the legend entirely
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true, // Removes grid lines on the x-axis
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
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-medium mb-2">Welcome back, Olivia</h1>
      <p className="text-[#667085] text-base font-normal mb-8">
        Track, manage and forecast your campaigns
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Sales"
          amount="340k"
          bottomText="↑ 40% vs last month"
        />
        <StatCard
          title="Total Inventory"
          amount="340k"
          bottomText="↑ 40% vs last month"
        />
        <StatCard
          title="Total Orders"
          amount="300K"
          bottomText="↑ 40% vs last month"
        />
        <StatCard
          title="Total Customers"
          amount="2,420"
          bottomText="↑ 40% vs last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales</h3>
            <Dropdown
              options={years}
              selected={selectedYear}
              onSelect={setSelectedYear}
            />
          </div>
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Revenue</h3>
            <Dropdown
              options={years}
              selected={selectedYear}
              onSelect={setSelectedYear}
            />
          </div>
          <Line data={lineData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
