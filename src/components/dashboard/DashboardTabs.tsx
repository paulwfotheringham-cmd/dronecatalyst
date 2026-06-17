"use client";

import { PAGE_TABS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardTabs() {
  return (
    <div className="border-b border-white/[0.06]">
      <nav className="-mb-px flex gap-1 overflow-x-auto pb-px scrollbar-none">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              "active" in tab && tab.active
                ? "border-blue-500 text-white"
                : "border-transparent text-white/40 hover:border-white/10 hover:text-white/65"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
