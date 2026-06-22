import { NextResponse } from "next/server";

import {
  fetchWebODMProjectsWithTasks,
  getWebODMBaseUrl,
  isWebODMConfigured,
} from "@/lib/webodm-client";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isWebODMConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        dashboardUrl: getWebODMBaseUrl(),
        error: "Set WEBODM_USERNAME and WEBODM_PASSWORD in Vercel Environment Variables (or .env.local for local dev).",
        projects: [],
      },
      { status: 503 },
    );
  }

  try {
    const projects = await fetchWebODMProjectsWithTasks();

    return NextResponse.json({
      configured: true,
      dashboardUrl: getWebODMBaseUrl(),
      projects,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load WebODM projects";

    return NextResponse.json(
      {
        configured: true,
        dashboardUrl: getWebODMBaseUrl(),
        error: message,
        projects: [],
      },
      { status: 502 },
    );
  }
}
