// app/auth/layout.tsx
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen  flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}