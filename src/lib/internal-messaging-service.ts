import {
  INTERNAL_MESSAGING_ROOM,
  mapChatMessage,
  type ChatMessage,
} from "@/lib/internal-messaging-data";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

type DbMessage = {
  id: string;
  room: string;
  operator_id: string;
  operator_name: string;
  username: string;
  content: string;
  created_at: string;
};

function requireMessagingSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.");
  }
  return createSupabaseServerClient();
}

export async function listMessages(options?: {
  room?: string;
  limit?: number;
}): Promise<ChatMessage[]> {
  const supabase = requireMessagingSupabase();
  const room = options?.room ?? INTERNAL_MESSAGING_ROOM;
  const limit = Math.min(Math.max(options?.limit ?? 100, 1), 200);

  const { data, error } = await supabase
    .from("internal_messages")
    .select("*")
    .eq("room", room)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as DbMessage[]).map(mapChatMessage);
}

export async function sendMessage(input: {
  operatorId: string;
  operatorName: string;
  username: string;
  content: string;
  room?: string;
}): Promise<ChatMessage> {
  const trimmed = input.content.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }

  const supabase = requireMessagingSupabase();
  const { data, error } = await supabase
    .from("internal_messages")
    .insert({
      room: input.room ?? INTERNAL_MESSAGING_ROOM,
      operator_id: input.operatorId,
      operator_name: input.operatorName,
      username: input.username,
      content: trimmed,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapChatMessage(data as DbMessage);
}
