import { project } from "@/lib/mock-data";
import KPIGrid from "./KPIGrid";

export default function HeroSection() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 space-y-3">
          <h1 className="text-2xl font-semibold uppercase tracking-[0.1em] text-white sm:text-3xl lg:text-4xl lg:leading-none">
            {project.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45">
            <span>{project.client}</span>
            <span className="text-white/20">•</span>
            <span>{project.siteArea}</span>
            <span className="text-white/20">•</span>
            <span>{project.location}</span>
            <span className="text-white/20">•</span>
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
