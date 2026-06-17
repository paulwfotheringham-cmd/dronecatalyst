import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Westport Logistics Hub — Intelligence Platform | Drone Catalyst",
  description:
    "Enterprise aerial intelligence dashboard for TerraBuild Infrastructure — Westport Logistics Hub, Western Australia.",
  robots: { index: false, follow: false },
};

export default function Test1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-[#07111F] text-white">
      {children}
    </div>
  );
}
