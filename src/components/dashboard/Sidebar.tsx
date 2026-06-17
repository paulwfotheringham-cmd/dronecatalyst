import { ScrollArea } from "@/components/ui/scroll-area";
import { NAV_ITEMS, project } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { DashboardIcon } from "./icons";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-dvh w-[240px] shrink-0 flex-col self-start overflow-hidden border-r border-white/[0.08] bg-[#07111F]">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.08] px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-white/90">
            DRONE CATALYST
          </p>
          <p className="text-[10px] text-white/35">Intelligence Platform</p>
        </div>
      </div>

      <div className="shrink-0 border-b border-white/[0.08] px-6 py-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
          Client
        </p>
        <p className="mt-2 text-sm font-medium leading-snug text-white/85">
          {project.client}
        </p>
        <div className="mt-5 space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            Project
          </p>
          <p className="text-sm leading-snug text-white/70">{project.name}</p>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-3 py-4">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-current={"active" in item && item.active ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-[13px] transition-colors",
                "active" in item && item.active
                  ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-white/45 hover:bg-[#0D1B2A]/60 hover:text-white/75"
              )}
            >
              <DashboardIcon name={item.icon} className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
