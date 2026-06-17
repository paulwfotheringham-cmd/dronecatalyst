import AISummaryCard from "@/components/dashboard/AISummaryCard";
import ActivitiesList from "@/components/dashboard/ActivitiesList";
import Header from "@/components/dashboard/Header";
import HeroSection from "@/components/dashboard/HeroSection";
import KPIGrid from "@/components/dashboard/KPIGrid";
import ProgressChart from "@/components/dashboard/ProgressChart";
import ProjectBrief from "@/components/dashboard/ProjectBrief";
import ReportsList from "@/components/dashboard/ReportsList";
import Sidebar from "@/components/dashboard/Sidebar";
import SiteIntelligence from "@/components/dashboard/SiteIntelligence";
import VolumeChart from "@/components/dashboard/VolumeChart";
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
          <div className="relative min-h-full px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <Image
              src={IMAGES.topography}
              alt=""
              fill
              className="pointer-events-none object-cover opacity-[0.03]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.08),transparent_65%)]" />

            <div className="relative space-y-8 lg:space-y-10">
              <HeroSection />
              <ProjectBrief />
              <AISummaryCard />
              <KPIGrid />
              <ProgressChart />
              <SiteIntelligence />
              <ZoneTable />
              <VolumeChart />

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <ReportsList />
                <ActivitiesList />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-[#0D1B2A] px-7 py-5 shadow-[0_24px_48px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2.5 text-xs text-white/40">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    Drone Catalyst Enterprise · Classification:{" "}
                    {PLATFORM_STATS.classification}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-white/35">
                  <span>API {PLATFORM_STATS.apiVersion}</span>
                  <span>·</span>
                  <span>Latency {PLATFORM_STATS.latency}</span>
                  <span>·</span>
                  <span>Uptime {PLATFORM_STATS.uptime}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
