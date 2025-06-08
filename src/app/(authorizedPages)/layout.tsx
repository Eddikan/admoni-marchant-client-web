"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/context/ToastContext";
import { FaBars } from "react-icons/fa";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsMobile } from "@/hooks/useMobile";

// import type { Metadata } from "next";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const { lg: isSmall } = useBreakpoint();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    setIsSidebarOpen(!isSmall);
  }, [isSmall, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className=" h-screen w-full">
      {/* Hamburger Menu for Mobile */}
      {isSmall && (
        <button className="hamburger p-2" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <ToastProvider>
        <div
          className={`${
            isSmall ? "" : "ml-[280px]"
          } px-2  md:px-8 py-11 bg-white min-h-screen `}
        >
          {children}
        </div>
      </ToastProvider>
    </main>
  );
}
