/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
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
          <h2 className="text-xl font-medium">{`Order #${rowData?.id}`}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              rowData?.status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {rowData?.status}
          </span>
        </div>
        <hr />
        {/* Items Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Items</h3>
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
        <div className="flex flex-col">
          <div className="flex justify-end">
            <div className="flex gap-10">
              <span className="text-grey-700 text-base font-normal ">
                Subtotal
              </span>
              <span>{formatCurrency(345.0)}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-10">
              <span className="text-grey-700 text-base font-normal ">
                Shipping fee
              </span>
              <span>{formatCurrency(345.0)}</span>
            </div>
          </div>{" "}
          <div className="flex justify-end">
            <div className="flex gap-10">
              <p className="text-grey-700 text-base font-normal ">Total</p>
              <p>{formatCurrency(345.0)}</p>
            </div>
          </div>
        </div>
        <hr />
        {/* Order Details Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Order Details
          </h3>
          <div className="text-sm space-y-2">
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Total items:</span>{" "}
              <span className="font-medium text-base">{rowData?.items}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Date ordered:</span>{" "}
              <span className="font-medium text-base">
                {rowData?.dateOrdered}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Delivery date:</span>{" "}
              <span className="font-medium text-base">
                {rowData?.deliveryDate}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Payment method:</span>{" "}
              <span className="font-medium text-base">
                {rowData?.paymentMethod}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Delivery address:</span>{" "}
              <span className="font-medium text-base">
                {rowData?.deliveryAddress}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Delivery type:</span>{" "}
              <span className="font-medium text-base">
                {rowData?.deliveryType}
              </span>
            </p>
          </div>
        </div>
        <hr />

        {/* Customer Details Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Customer Details
          </h3>
          <div className="text-sm space-y-2">
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Customer name:</span>{" "}
              <span className="font-medium text-base">{rowData?.customer}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Email:</span>{" "}
              <span className="font-medium text-base">{rowData?.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-grey-700 text-base">Phone no:</span>{" "}
              <span className="font-medium text-base">{rowData?.phone}</span>
            </p>
          </div>
        </div>
      </div>
      {/* children ends here  */}
    </SideMenu>
  );
};

export default OrderSideMenu;
