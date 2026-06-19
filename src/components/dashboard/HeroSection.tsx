import { project } from "@/lib/mock-data";
import KPIGrid from "./KPIGrid";

export default function HeroSection() {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
        <div className="min-w-0 space-y-2.5 sm:space-y-3">
          <h1 className="text-xl font-semibold uppercase tracking-[0.08em] text-white sm:text-2xl md:text-3xl lg:text-4xl lg:leading-none">
            {project.name}
          </h1>
          <div className="flex flex-col gap-1 text-xs text-white/45 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1 sm:text-sm">
            <span>{project.client}</span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>{project.siteArea}</span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>{project.location}</span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span className="text-white/55">Updated {project.updated}</span>
          </div>
        </div>
        <div className="w-full xl:max-w-[520px] xl:shrink-0">
          <KPIGrid />
        </div>
      </div>
    </div>
  );
}
