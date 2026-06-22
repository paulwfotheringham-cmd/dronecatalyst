import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Internal Operations Dashboard | DroneCatalyst",
  description:
    "Internal survey operations dashboard with live FlightHub telemetry, fleet status, assets, and mission management.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function InternalDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
