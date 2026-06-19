"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 w-full">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[#07111F]/80 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#07111F]">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        {children}
      </div>
    </div>
  );
}
