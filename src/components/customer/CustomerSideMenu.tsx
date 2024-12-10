/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
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
  return (
    <SideMenu isOpen={isOpen} onClose={() => onClose()}>
      {/* children starts here  */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-medium">{`${rowData?.id}`}</h2>
        </div>
        <hr />
        {/* Customer Details Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Customer Details
          </h3>
          <div className="text-sm space-y-2">
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Customer ID:</span>{" "}
              <span className="font-medium text-base">{rowData?.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Email:</span>{" "}
              <span className="font-medium text-base">{rowData?.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Phone no:</span>{" "}
              <span className="font-medium text-base">{rowData?.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Gender</span>{" "}
              <span className="font-medium text-base">{rowData?.gender}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Address</span>{" "}
              <span className="font-medium text-base">{rowData?.address}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Delivery type</span>{" "}
              <span className="font-medium text-base">
                {rowData?.deliveryType}
              </span>
            </p>
          </div>
        </div>
        <hr />

        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Purchase History
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <TopCard title="Total Items" content="1234" />
          <TopCard title="Total Amount" content="₦120M" />
          <TopCard title="Items Returned" content="20" />
        </div>
        {/* Items Section */}
        <div>
          <ul className="space-y-4">
            {rowData?.itemsList?.map((item: any, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex  w-full justify-between gap-3 items-center space-x-4">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className=" rounded"
                      height={44}
                      width={44}
                    />
                    <p className="font-normal text-grey-400 text-base">
                      {item.name}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">{`${item.quantity} pcs`}</p>
                  <p className="font-medium text-gray-800">{`${formatCurrency(
                    item.price
                  )}`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
      {/* children ends here  */}
    </SideMenu>
  );
};

export default OrderSideMenu;
