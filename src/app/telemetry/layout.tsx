import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Live Telemetry | DroneCatalyst",
  description:
    "Operational telemetry monitoring dashboard for DroneCatalyst survey fleet and FlightHub integrations.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function TelemetryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex h-dvh max-h-dvh flex-col overflow-hidden overscroll-none bg-[#020617] text-white supports-[height:100dvh]:h-dvh">
      {children}
    </div>
  );
}
