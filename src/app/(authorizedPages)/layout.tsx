"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/context/ToastContext";
import { FaBars } from "react-icons/fa";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsMobile } from "@/hooks/useMobile";
import localFont from "next/font/local";


// import type { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default  function RootLayout({
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
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
    <main
      className={`${isSmall ? "" : "ml-[280px]"} px-8 py-11 bg-white min-h-screen `}
    >
 
      {children}
    </main>
    </ToastProvider>
  </body>
  );
}
