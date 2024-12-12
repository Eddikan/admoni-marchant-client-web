import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { lg: isSmall } = useBreakpoint();
  const pathname = usePathname();

  // Navigation links
  const links = [
    { name: "Dashboard", path: "/dashboard", img: "/icons/dashboard.svg" },
    { name: "Orders", path: "/orders", img: "/icons/orders.svg" },
    { name: "Customers", path: "/customers", img: "/icons/customers.svg" },
    { name: "Wallet", path: "/wallet", img: "/icons/wallet.svg" },
    { name: "Inventory", path: "/inventory", img: "/icons/inventory.svg" },
    {
      name: "Notifications",
      path: "/notifications",
      img: "/icons/notifications.svg",
    },
    { name: "Help", path: "/help", img: "/icons/help.svg" },
  ];

  return (
    <>
      {isOpen && isSmall && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-25 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed w-[280px] z-[52] flex flex-col justify-between top-0 left-0 h-full bg-green-900 text-white p-6 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Header with Logo and Close Button */}
          <div className="flex mb-6 items-center gap-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={50}
              priority
            />
            {isSmall && (
              <button onClick={toggleSidebar} className="text-xl">
                <AiOutlineClose />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center text-sm gap-4 px-3 py-2 rounded-lg font-medium ${
                      pathname === link.path
                        ? "bg-[#196C45] text-white"
                        : "text-gray-300 hover:bg-green-800 hover:text-white"
                    }`}
                  >
                    <Image
                      src={link.img}
                      alt={link.name}
                      width={20}
                      height={20}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content Area with flex-grow */}
        <div className="">
          <Link
            href="/settings"
            className={`flex items-center text-sm gap-4 px-3 py-2 rounded-lg font-medium ${
              pathname === "/settings"
                ? "bg-[#196C45] text-white"
                : "text-gray-300 hover:bg-green-800 hover:text-white"
            }`}
          >
            <Image
              src="/icons/settings.svg"
              alt="settings"
              width={20}
              height={20}
            />
            Settings
          </Link>
          <hr className="my-6" />

          {/* User Info */}
          <div className="mt-auto flex gap-3 text-center">
            <Image
              src="/icons/user.svg"
              alt="user"
              className="rounded-full"
              width={64}
              height={64}
              priority
            />
            <div className="flex flex-col text-left">
              <p>Olivia Rhye</p>
              <p className="text-gray-300">olivia@admoni.com</p>
            </div>
            <Image
              src="/icons/logout.svg"
              alt="logout"
              className="cursor-pointer"
              width={64}
              height={64}
              priority
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
