import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/mock-data";
import { Bell, ChevronRight, Download, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#07111F]/90 px-8 backdrop-blur-xl lg:px-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <span>TerraBuild</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/75">{project.name}</span>
        </div>
        <Badge variant="info" className="hidden sm:inline-flex">
          Live
        </Badge>
        <span className="hidden items-center gap-2 text-xs text-emerald-400 md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Systems nominal
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0D1B2A] px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-white/30" />
          <span className="text-sm text-white/35">Search intelligence…</span>
          <kbd className="rounded-lg border border-white/[0.08] bg-[#07111F] px-2 py-0.5 font-mono text-[10px] text-white/30">
            ⌘K
          </kbd>
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-2xl">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Button>
        <Button variant="secondary" size="sm" className="hidden rounded-2xl sm:inline-flex">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#0D1B2A] text-xs font-medium">
          TB
        </div>
      </div>
    </header>
  );
}
