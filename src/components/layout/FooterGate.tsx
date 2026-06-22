"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterGate() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/test1") ||
    pathname?.startsWith("/testflighthub") ||
    pathname?.startsWith("/internaldashboard") ||
    pathname?.startsWith("/files") ||
    pathname?.startsWith("/telemetry")
  ) {
    return null;
  }

  return <Footer />;
}
