// app/auth/layout.tsx
"use client"
import React from "react";
import { ToastProvider } from "@/context/ToastContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen  flex items-center justify-center bg-gray-50">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
