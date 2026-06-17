import AISummaryCard from "@/components/dashboard/AISummaryCard";
import ActivitiesList from "@/components/dashboard/ActivitiesList";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Header from "@/components/dashboard/Header";
import HeroSection from "@/components/dashboard/HeroSection";
import ProjectBrief from "@/components/dashboard/ProjectBrief";
import ReportsSection from "@/components/dashboard/ReportsSection";
import Sidebar from "@/components/dashboard/Sidebar";
import SiteIntelligence from "@/components/dashboard/SiteIntelligence";
import ZoneTable from "@/components/dashboard/ZoneTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMAGES, PLATFORM_STATS } from "@/lib/mock-data";
import { TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Test1Page() {
  return (
    <div className="flex h-full min-h-0">
      <Sidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#07111F]">
        <Header />

        <ScrollArea className="min-h-0 flex-1">
          <div className="relative min-h-full px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
            <Image
              src={IMAGES.topography}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-[0.025]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.09),transparent_60%)]" />

            <div className="relative space-y-8 lg:space-y-10">
              <HeroSection />
              <DashboardTabs />

              <SiteIntelligence />

              <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
                <div className="lg:col-span-3">
                  <AISummaryCard />
                </div>
                <div className="lg:col-span-2">
                  <ProjectBrief />
                </div>
              </div>

              <AnalyticsSection />
              <ZoneTable />
              <ReportsSection />

              <ActivitiesList />

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0D1B2A]/80 px-6 py-4 shadow-[0_20px_48px_rgba(0,0,0,0.28)]">
                <div className="flex items-center gap-2.5 text-xs text-white/40">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Drone Catalyst Enterprise · {PLATFORM_STATS.classification}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-white/35">
                  <span>API {PLATFORM_STATS.apiVersion}</span>
                  <span className="text-white/15">·</span>
                  <span>{PLATFORM_STATS.latency}</span>
                  <span className="text-white/15">·</span>
                  <span>{PLATFORM_STATS.uptime} uptime</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
