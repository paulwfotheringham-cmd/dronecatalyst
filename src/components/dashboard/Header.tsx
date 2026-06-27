"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/mock-data";
import { Bell, ChevronRight, Download, Menu, Search } from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

const VIEWER_KEY = "client:westport";

export default function Header({ onMenuClick }: HeaderProps) {
  const [unreadTotal, setUnreadTotal] = useState(0);

  const loadUnread = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/messaging/unread?viewerKey=${encodeURIComponent(VIEWER_KEY)}`,
        { cache: "no-store" },
      );
      const data = (await response.json()) as { unreadTotal?: number };
      if (response.ok) setUnreadTotal(data.unreadTotal ?? 0);
    } catch {
      // ignore polling errors
    }
  }, []);

  useEffect(() => {
    void loadUnread();
    const timer = window.setInterval(() => void loadUnread(), 15000);
    return () => window.clearInterval(timer);
  }, [loadUnread]);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-[#07111F]/90 px-4 backdrop-blur-xl sm:h-16 sm:px-6 lg:px-10">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-xl lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex min-w-0 items-center gap-1.5 text-xs text-white/40 sm:gap-2 sm:text-sm">
          <span className="shrink-0">TerraBuild</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate text-white/75">{project.name}</span>
        </div>
        <Badge variant="info" className="hidden shrink-0 sm:inline-flex">
          Live
        </Badge>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <div className="hidden items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0D1B2A] px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-white/30" />
          <span className="text-sm text-white/35">Search intelligence…</span>
          <kbd className="rounded-lg border border-white/[0.08] bg-[#07111F] px-2 py-0.5 font-mono text-[10px] text-white/30">
            ⌘K
          </kbd>
        </div>
        <Link
          href="/clients/westport/messages"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/70 transition-colors hover:bg-white/[0.04] sm:h-10 sm:w-10"
          aria-label="Open messages"
        >
          <Bell className="h-4 w-4" />
          {unreadTotal > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-[#07111F]">
              {unreadTotal}
            </span>
          )}
        </Link>
        <Button variant="secondary" size="sm" className="hidden rounded-2xl sm:inline-flex">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-[#0D1B2A] text-[11px] font-medium sm:h-9 sm:w-9 sm:text-xs">
          TB
        </div>
      </div>
    </header>
  );
}
