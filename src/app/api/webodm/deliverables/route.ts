import { NextRequest, NextResponse } from "next/server";

import { BRIGHTON_BEACH_TASK_NAME } from "@/lib/webodm-deliverables";
import { fetchTaskDeliverables, isWebODMConfigured } from "@/lib/webodm-client";
import { getPublicWebODMUrl } from "@/lib/webodm-env";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const taskName = request.nextUrl.searchParams.get("task")?.trim() || BRIGHTON_BEACH_TASK_NAME;

  if (!isWebODMConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        dashboardUrl: getPublicWebODMUrl(),
        error: "WebODM is not configured.",
        mission: null,
        deliverables: [],
      },
      { status: 503 },
    );
  }

  try {
    const { mission, deliverables } = await fetchTaskDeliverables(taskName);

    return NextResponse.json({
      configured: true,
      dashboardUrl: getPublicWebODMUrl(),
      mission,
      deliverables,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load deliverables";

    return NextResponse.json(
      {
        configured: true,
        dashboardUrl: getPublicWebODMUrl(),
        error: message,
        mission: null,
        deliverables: [],
      },
      { status: 502 },
    );
  }
}
