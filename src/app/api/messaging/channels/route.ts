import { NextRequest, NextResponse } from "next/server";

import {
  createChannel,
  listChannels,
  updateChannelMembers,
} from "@/lib/internal-messaging-service";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    const channels = await listChannels();
    return NextResponse.json({ channels });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load channels";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      createdByOperatorId?: string;
      createdByOperatorName?: string;
      memberOperatorIds?: string[];
    };

    if (!body.name || !body.createdByOperatorId || !body.createdByOperatorName) {
      return NextResponse.json({ error: "Channel name and creator are required." }, { status: 400 });
    }

    const channel = await createChannel({
      name: body.name,
      createdByOperatorId: body.createdByOperatorId,
      createdByOperatorName: body.createdByOperatorName,
      memberOperatorIds: body.memberOperatorIds ?? [],
    });

    return NextResponse.json({ channel });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create channel";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  try {
    const body = (await request.json()) as {
      channelId?: string;
      memberOperatorIds?: string[];
    };

    if (!body.channelId || !body.memberOperatorIds) {
      return NextResponse.json({ error: "Channel ID and members are required." }, { status: 400 });
    }

    const channel = await updateChannelMembers(body.channelId, body.memberOperatorIds);
    return NextResponse.json({ channel });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update channel";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
