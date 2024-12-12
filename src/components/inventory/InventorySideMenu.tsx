/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import TopCard from "@/components/TopCard";
import SideMenu from "@/components/ui/SideMenu";
interface SideMenuProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  onClose: () => void;
}

const OrderSideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  rowData,
  onClose,
}) => {
  const percentage =
    (rowData?.statistics?.sold / rowData?.statistics?.total) * 100;
  return (
    <SideMenu isOpen={isOpen} onClose={() => onClose()}>
      {/* children starts here  */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-medium">{`${rowData?.item?.name}`}</h2>
        </div>
        <hr />

        <h3 className="text-lg font-medium text-gray-700 mb-2">Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <TopCard title="Total Sold" content="1234" />
          <TopCard title="Total Amount" content="₦120M" />
          <TopCard title="Available Stock" content="20" />
        </div>
        <div className="flex flex-col items-start">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              style={{ width: `${percentage}%` }}
              className="bg-green-500 h-2 rounded-full"
            />
          </div>
          <span className="text-base mt-1 text-center  w-full text-gray-500">
            {rowData?.statistics?.sold}/{rowData?.statistics?.total}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Item Details
          </h3>
          {/* Items Section */}
          <div className="mb-6">
            <ul className="flex overflow-x-auto gap-4">
              {rowData?.itemsList?.map((item: any, index: number) => (
                <li key={index} className="flex gap-2 items-center ">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className=" rounded"
                    height={101}
                    width={139}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm space-y-2">
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Item ID:</span>{" "}
              <span className="font-medium text-base">{rowData?.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Category:</span>{" "}
              <span className="font-medium text-base">{rowData?.category}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Price:</span>{" "}
              <span className="font-medium text-base">{rowData?.price}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Discount</span>{" "}
              <span className="font-medium text-base">5%</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Quantity</span>{" "}
              <span className="font-medium text-base">{rowData?.quantity}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Status</span>{" "}
              <span className="font-medium text-base">Active</span>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-grey-700">
            Lorem ipsum dolor sit amet consectetur. Elit quis ipsum urna cursus
            mi phasellus at r sit amet consectauctor sit.
          </p>
        </div>
      </div>
      {/* children ends here  */}
    </SideMenu>
  );
};

export default OrderSideMenu;
