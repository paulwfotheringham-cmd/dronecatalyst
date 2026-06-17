import { Badge } from "@/components/ui/badge";
import { project } from "@/lib/mock-data";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
      <div className="space-y-5">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl lg:text-5xl lg:leading-[1.05]">
            {project.name}
          </h1>
          <div className="space-y-1 text-base text-white/50 sm:text-lg">
            <p>{project.industry}</p>
            <p>{project.location}</p>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-white/40 lg:text-base">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 xl:justify-end">
        <Badge variant="success" className="rounded-2xl px-4 py-1.5 text-sm">
          {project.completion}% Complete
        </Badge>
        <Badge variant="info" className="rounded-2xl px-4 py-1.5 text-sm">
          +{project.daysAhead} Days Ahead
        </Badge>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0D1B2A] px-5 py-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/35">
            Last Survey
          </span>
          <span className="font-mono text-sm text-white/80">{project.lastSurvey}</span>
        </div>
      </div>
    </div>
  );
}
