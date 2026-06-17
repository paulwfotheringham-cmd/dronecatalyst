import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PROJECT_BRIEF } from "@/lib/mock-data";
import { Building2 } from "lucide-react";

export default function ProjectBrief() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#07111F]">
            <Building2 className="h-5 w-5 text-white/50" />
          </div>
          <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
            {PROJECT_BRIEF.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8 pt-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-white/65 lg:text-lg">
            {PROJECT_BRIEF.intro}
          </p>
          <ul className="space-y-3">
            {PROJECT_BRIEF.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-white/55 lg:text-base"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/[0.08] bg-[#07111F] p-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/35">
              Target Completion
            </p>
            <p className="mt-2 font-mono text-xl text-white/90">
              {PROJECT_BRIEF.targetCompletion}
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#07111F] p-5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/35">
              Project Value
            </p>
            <p className="mt-2 font-mono text-xl text-white/90">
              {PROJECT_BRIEF.projectValue}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
