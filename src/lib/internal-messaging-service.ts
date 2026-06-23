import {
  INTERNAL_MESSAGING_ROOM,
  mapChatMessage,
  mapMessageChannel,
  mapScheduledCall,
  slugifyChannelName,
  type ChatMessage,
  type MessageChannel,
  type MessageType,
  type ScheduledCall,
} from "@/lib/internal-messaging-data";
import { INTERNAL_FILES_BUCKET } from "@/lib/internal-files-data";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

type DbMessage = Parameters<typeof mapChatMessage>[0];
type DbChannel = Parameters<typeof mapMessageChannel>[0];
type DbScheduledCall = Parameters<typeof mapScheduledCall>[0];

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
  messageType?: MessageType;
  attachmentName?: string | null;
  attachmentUrl?: string | null;
  attachmentMime?: string | null;
  callLink?: string | null;
}): Promise<ChatMessage> {
  const trimmed = input.content.trim();
  const hasAttachment = Boolean(input.attachmentUrl);
  if (!trimmed && !hasAttachment && input.messageType !== "call") {
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
      content: trimmed || input.attachmentName || "Attachment",
      message_type: input.messageType ?? (hasAttachment ? "file" : "text"),
      attachment_name: input.attachmentName ?? null,
      attachment_url: input.attachmentUrl ?? null,
      attachment_mime: input.attachmentMime ?? null,
      call_link: input.callLink ?? null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapChatMessage(data as DbMessage);
}

export async function listChannels(): Promise<MessageChannel[]> {
  const supabase = requireMessagingSupabase();
  const { data, error } = await supabase
    .from("internal_message_channels")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as DbChannel[]).map(mapMessageChannel);
}

export async function createChannel(input: {
  name: string;
  createdByOperatorId: string;
  createdByOperatorName: string;
  memberOperatorIds: string[];
}): Promise<MessageChannel> {
  const name = input.name.trim();
  if (!name) throw new Error("Channel name is required.");

  const members = Array.from(
    new Set([input.createdByOperatorId, ...input.memberOperatorIds.filter(Boolean)]),
  );

  const supabase = requireMessagingSupabase();
  const room = `${slugifyChannelName(name)}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("internal_message_channels")
    .insert({
      room,
      name,
      created_by_operator_id: input.createdByOperatorId,
      created_by_operator_name: input.createdByOperatorName,
      member_operator_ids: members,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapMessageChannel(data as DbChannel);
}

export async function updateChannelMembers(
  channelId: string,
  memberOperatorIds: string[],
): Promise<MessageChannel> {
  const members = Array.from(new Set(memberOperatorIds.filter(Boolean)));
  if (members.length === 0) {
    throw new Error("At least one member is required.");
  }

  const supabase = requireMessagingSupabase();
  const { data, error } = await supabase
    .from("internal_message_channels")
    .update({ member_operator_ids: members })
    .eq("id", channelId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapMessageChannel(data as DbChannel);
}

export async function listScheduledCalls(room?: string): Promise<ScheduledCall[]> {
  const supabase = requireMessagingSupabase();
  let query = supabase
    .from("internal_scheduled_calls")
    .select("*")
    .order("scheduled_at", { ascending: true });

  if (room) {
    query = query.eq("room", room);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data as DbScheduledCall[]).map(mapScheduledCall);
}

export async function createScheduledCall(input: {
  room: string;
  title: string;
  scheduledAt: string;
  participantOperatorIds: string[];
  callLink: string;
  callType: "voice" | "video";
  createdByOperatorId: string;
  createdByOperatorName: string;
}): Promise<ScheduledCall> {
  const title = input.title.trim();
  if (!title) throw new Error("Call title is required.");

  const supabase = requireMessagingSupabase();
  const { data, error } = await supabase
    .from("internal_scheduled_calls")
    .insert({
      room: input.room,
      title,
      scheduled_at: input.scheduledAt,
      participant_operator_ids: input.participantOperatorIds,
      call_link: input.callLink,
      call_type: input.callType,
      created_by_operator_id: input.createdByOperatorId,
      created_by_operator_name: input.createdByOperatorName,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return mapScheduledCall(data as DbScheduledCall);
}

export async function uploadMessagingAttachment(file: File, room: string) {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Attachments must be 10 MB or smaller.");
  }

  const supabase = requireMessagingSupabase();
  const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
  const storagePath = `messaging/${room}/${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(INTERNAL_FILES_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from(INTERNAL_FILES_BUCKET).getPublicUrl(storagePath);

  return {
    name: file.name,
    url: data.publicUrl,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  };
}
