import { NextRequest, NextResponse } from "next/server";

import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import { normalizeWhiteboardScene, type WhiteboardScene } from "@/lib/whiteboard-data";
import { ensureWhiteboardTable, withWhiteboardTable } from "@/lib/internal-db-migrations";
import { getWhiteboardScene, saveWhiteboardScene } from "@/lib/whiteboard-service";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    await ensureWhiteboardTable();
    const scene = await withWhiteboardTable(() => getWhiteboardScene());
    return NextResponse.json({ scene });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load whiteboard";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    await ensureWhiteboardTable();
    const body = (await request.json()) as {
      elements?: WhiteboardScene["elements"];
      appState?: Partial<AppState>;
      files?: BinaryFiles;
    };

    const scene = normalizeWhiteboardScene(
      body.elements ?? [],
      (body.appState ?? { theme: "dark" }) as AppState,
      body.files ?? {},
    );

    const saved = await withWhiteboardTable(() => saveWhiteboardScene(scene));
    return NextResponse.json({ scene: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save whiteboard";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
