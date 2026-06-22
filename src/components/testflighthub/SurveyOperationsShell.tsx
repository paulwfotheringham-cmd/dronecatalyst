"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import {
  internalViewTitles,
  isInternalOperationsView,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import {
  surveyViewTitles,
  type SurveyOperationsBasePath,
  type SurveyOperationsView,
} from "@/lib/survey-operations-mock-data";

import SurveyOperationsSidebar from "./SurveyOperationsSidebar";

type SurveyOperationsShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  mode?: "survey" | "internal";
  activeView?: SurveyOperationsView | InternalOperationsView;
  onViewChange?: (view: SurveyOperationsView | InternalOperationsView) => void;
  basePath?: SurveyOperationsBasePath;
};

export default function SurveyOperationsShell({
  children,
  title = "Operations Dashboard",
  subtitle = "Survey Operations",
  mode = "survey",
  activeView,
  onViewChange,
  basePath = "/testflighthub",
}: SurveyOperationsShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const resolvedTitle =
    activeView != null
      ? mode === "internal" && isInternalOperationsView(activeView)
        ? internalViewTitles[activeView].title
        : surveyViewTitles[activeView as SurveyOperationsView].title
      : title;
  const resolvedSubtitle =
    activeView != null
      ? mode === "internal" && isInternalOperationsView(activeView)
        ? internalViewTitles[activeView].subtitle
        : surveyViewTitles[activeView as SurveyOperationsView].subtitle
      : subtitle;

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

      <SurveyOperationsSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        mode={mode}
        activeView={activeView}
        onViewChange={onViewChange}
        basePath={basePath}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#020617]">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#07111F]/80 px-4 backdrop-blur-xl lg:h-16 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                {resolvedSubtitle}
              </p>
              <h1 className="text-base font-semibold text-white sm:text-lg">{resolvedTitle}</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            FlightHub Connected
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
