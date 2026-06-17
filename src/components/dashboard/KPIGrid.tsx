import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { KPI_METRICS } from "@/lib/mock-data";
import { DashboardIcon } from "./icons";

export default function KPIGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {KPI_METRICS.map((metric) => (
        <Card
          key={metric.label}
          className="group relative overflow-hidden transition-colors hover:border-white/[0.14]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="font-mono text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                  {metric.value}
                </p>
                <p className="text-sm text-white/45">{metric.label}</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#07111F]">
                <DashboardIcon name={metric.icon} className="h-4 w-4 text-white/50" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
