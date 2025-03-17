// app/auth/layout.tsx
import React from "react";
import "./globals.css";
import { ReduxProvider } from "@/store/Provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
