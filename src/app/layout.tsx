"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsMobile } from "@/hooks/useMobile";
import { ToastProvider } from '@/context/ToastContext';
import "./globals.css";

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

// export const metadata: Metadata = {
//   title: "Admoni Merchant Website",
//   description: "Generated for Admoni",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();

  const { lg: isSmall } = useBreakpoint();
  useEffect(() => {
    setIsSidebarOpen(!isSmall);
  }, [isSmall, isMobile]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
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
          className={`${isSmall ? "" : "ml-[280px]"} px-8 py-11 bg-gray-100 `}
        >
     
          {children}
        </main>
        </ToastProvider>
      </body>
    </html>
  );
}
