import {
  EMPTY_WHITEBOARD_SCENE,
  INTERNAL_WHITEBOARD_ID,
  mapWhiteboardScene,
  type WhiteboardScene,
} from "@/lib/whiteboard-data";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

type DbWhiteboard = Parameters<typeof mapWhiteboardScene>[0];

function requireWhiteboardSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.");
  }
  return createSupabaseServerClient();
}

export async function getWhiteboardScene(): Promise<WhiteboardScene> {
  const supabase = requireWhiteboardSupabase();
  const { data, error } = await supabase
    .from("internal_whiteboard")
    .select("*")
    .eq("id", INTERNAL_WHITEBOARD_ID)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return EMPTY_WHITEBOARD_SCENE;
  return mapWhiteboardScene(data as DbWhiteboard);
}

export async function saveWhiteboardScene(scene: WhiteboardScene): Promise<WhiteboardScene> {
  const supabase = requireWhiteboardSupabase();
  const { data, error } = await supabase
    .from("internal_whiteboard")
    .upsert({
      id: INTERNAL_WHITEBOARD_ID,
      scene,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapWhiteboardScene(data as DbWhiteboard);
}
