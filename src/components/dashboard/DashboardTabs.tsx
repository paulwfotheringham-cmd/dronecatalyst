"use client";

import { PAGE_TABS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardTabs() {
  return (
    <div className="border-b border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav className="-mb-px flex gap-0.5 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={cn(
              "shrink-0 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors sm:px-4 sm:py-3 sm:text-sm",
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
