export const INTERNAL_MESSAGING_ROOM = "internal-ops";

export type ChatMessage = {
  id: string;
  room: string;
  operatorId: string;
  operatorName: string;
  username: string;
  content: string;
  createdAt: string;
};

export type MessagingParticipant = {
  operatorId: string;
  operatorName: string;
  username: string;
  joinedAt: string;
};

type DbMessage = {
  id: string;
  room: string;
  operator_id: string;
  operator_name: string;
  username: string;
  content: string;
  created_at: string;
};

export function mapChatMessage(row: DbMessage): ChatMessage {
  return {
    id: row.id,
    room: row.room,
    operatorId: row.operator_id,
    operatorName: row.operator_name,
    username: row.username,
    content: row.content,
    createdAt: row.created_at,
  };
}

export function formatMessageTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const MESSAGING_STORAGE_KEY = "dc-messaging-operator-id";
