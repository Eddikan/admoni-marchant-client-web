"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Hamburger Menu for Mobile */}
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
