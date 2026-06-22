"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  formatMessageTime,
  INTERNAL_MESSAGING_ROOM,
  MESSAGING_STORAGE_KEY,
  type ChatMessage,
  type MessagingParticipant,
} from "@/lib/internal-messaging-data";
import { createInitialUsers } from "@/lib/user-management-data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Loader2, MessageSquare, Send, Users } from "lucide-react";

const operators = createInitialUsers();

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    throw new Error(`Request failed (${response.status})`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

export default function MessagingWorkspace() {
  const operatorsById = useMemo(
    () => new Map(operators.map((operator) => [operator.id, operator])),
    [],
  );

  const [joinedOperatorId, setJoinedOperatorId] = useState<string | null>(null);
  const [pendingOperatorId, setPendingOperatorId] = useState(operators[0]?.id ?? "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<MessagingParticipant[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<"connecting" | "live" | "polling">(
    "connecting",
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const joinedOperator = joinedOperatorId ? operatorsById.get(joinedOperatorId) : undefined;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const loadMessages = useCallback(async () => {
    const response = await fetch(`/api/messaging/messages?room=${INTERNAL_MESSAGING_ROOM}`, {
      cache: "no-store",
    });
    const data = await readApiJson<{ messages?: ChatMessage[]; error?: string }>(response);
    if (!response.ok) {
      throw new Error(data.error ?? "Failed to load messages");
    }
    setMessages(data.messages ?? []);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(MESSAGING_STORAGE_KEY);
    if (stored && operatorsById.has(stored)) {
      setJoinedOperatorId(stored);
      setPendingOperatorId(stored);
    }
  }, [operatorsById]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setLoading(true);
      setError(null);

      try {
        await loadMessages();
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load messages");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!joinedOperator) return;

    const operator = joinedOperator;
    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let channel: ReturnType<ReturnType<typeof createSupabaseBrowserClient>["channel"]> | null =
      null;
    let supabase: ReturnType<typeof createSupabaseBrowserClient> | null = null;

    async function connectRealtime() {
      try {
        const configResponse = await fetch("/api/messaging/config", { cache: "no-store" });
        const config = await readApiJson<{
          configured?: boolean;
          supabaseUrl?: string;
          supabaseAnonKey?: string;
          error?: string;
        }>(configResponse);

        if (!configResponse.ok || !config.supabaseUrl || !config.supabaseAnonKey) {
          throw new Error(config.error ?? "Realtime is not configured");
        }

        supabase = createSupabaseBrowserClient(config.supabaseUrl, config.supabaseAnonKey);

        channel = supabase
          .channel(`internal-messaging:${INTERNAL_MESSAGING_ROOM}`, {
            config: { presence: { key: operator.id } },
          })
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "internal_messages",
              filter: `room=eq.${INTERNAL_MESSAGING_ROOM}`,
            },
            (payload) => {
              const row = payload.new as {
                id: string;
                room: string;
                operator_id: string;
                operator_name: string;
                username: string;
                content: string;
                created_at: string;
              };

              setMessages((current) => {
                if (current.some((message) => message.id === row.id)) {
                  return current;
                }

                return [
                  ...current,
                  {
                    id: row.id,
                    room: row.room,
                    operatorId: row.operator_id,
                    operatorName: row.operator_name,
                    username: row.username,
                    content: row.content,
                    createdAt: row.created_at,
                  },
                ];
              });
            },
          )
          .on("presence", { event: "sync" }, () => {
            const state = channel?.presenceState() ?? {};
            const nextParticipants: MessagingParticipant[] = [];

            for (const entries of Object.values(state)) {
              for (const entry of entries as Array<{
                operator_id?: string;
                operator_name?: string;
                username?: string;
                joined_at?: string;
              }>) {
                if (!entry.operator_id || !entry.operator_name || !entry.username) continue;
                nextParticipants.push({
                  operatorId: entry.operator_id,
                  operatorName: entry.operator_name,
                  username: entry.username,
                  joinedAt: entry.joined_at ?? new Date().toISOString(),
                });
              }
            }

            nextParticipants.sort((a, b) => a.operatorName.localeCompare(b.operatorName));
            setParticipants(nextParticipants);
          });

        await channel.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            setRealtimeStatus("live");
            await channel?.track({
              operator_id: operator.id,
              operator_name: operator.fullName,
              username: operator.username,
              joined_at: new Date().toISOString(),
            });
          }
        });
      } catch {
        if (cancelled) return;
        setRealtimeStatus("polling");
        pollTimer = setInterval(() => {
          void loadMessages().catch(() => undefined);
        }, 3000);
      }
    }

    void connectRealtime();

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
      if (channel && supabase) {
        void supabase.removeChannel(channel);
      }
    };
  }, [joinedOperator, loadMessages]);

  function handleJoin(operatorId: string) {
    setJoinedOperatorId(operatorId);
    window.localStorage.setItem(MESSAGING_STORAGE_KEY, operatorId);
    setError(null);
  }

  function handleLeave() {
    setJoinedOperatorId(null);
    window.localStorage.removeItem(MESSAGING_STORAGE_KEY);
    setParticipants([]);
    setRealtimeStatus("connecting");
  }

  async function handleSend(event: React.FormEvent) {
    event.preventDefault();
    if (!joinedOperator || !draft.trim()) return;

    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/messaging/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operatorId: joinedOperator.id,
          operatorName: joinedOperator.fullName,
          username: joinedOperator.username,
          content: draft,
          room: INTERNAL_MESSAGING_ROOM,
        }),
      });

      const data = await readApiJson<{ message?: ChatMessage; error?: string }>(response);
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      if (data.message) {
        setMessages((current) => {
          if (current.some((message) => message.id === data.message!.id)) {
            return current;
          }
          return [...current, data.message!];
        });
      }

      setDraft("");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-sky-300" />
          <h2 className="text-sm font-semibold text-white">Join as operator</h2>
        </div>
        <p className="mt-2 text-xs text-white/45">
          Pick your operator profile to join the internal operations room.
        </p>

        {!joinedOperator ? (
          <div className="mt-4 space-y-3">
            <select
              value={pendingOperatorId}
              onChange={(event) => setPendingOperatorId(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm text-white outline-none focus:border-sky-400/50"
            >
              {operators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.fullName} (@{operator.username})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleJoin(pendingOperatorId)}
              className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#2563eb] text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
            >
              Join room
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300">
              Connected
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{joinedOperator.fullName}</p>
            <p className="mt-0.5 font-mono text-xs text-white/45">@{joinedOperator.username}</p>
            <button
              type="button"
              onClick={handleLeave}
              className="mt-3 text-xs font-medium text-white/55 transition-colors hover:text-white"
            >
              Switch operator
            </button>
          </div>
        )}

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Online now
          </p>
          <ul className="mt-3 space-y-2">
            {participants.length === 0 ? (
              <li className="text-xs text-white/40">No operators in the room yet.</li>
            ) : (
              participants.map((participant) => (
                <li
                  key={participant.operatorId}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{participant.operatorName}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-white/30">
          {realtimeStatus === "live"
            ? "Realtime connected"
            : realtimeStatus === "polling"
              ? "Polling fallback"
              : "Connecting…"}
        </p>
      </aside>

      <section className="flex min-h-[min(72vh,760px)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Internal Operations Room</h2>
              <p className="text-xs text-white/45">Real-time messaging for operators and staff</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
            {messages.length} messages
          </span>
        </div>

        {error && (
          <div className="border-b border-red-400/20 bg-red-500/10 px-5 py-3 text-sm text-red-200">
            {error}
            {error.includes("internal_messages") && (
              <p className="mt-1 text-xs text-red-200/70">
                Run{" "}
                <span className="font-mono">supabase/migrations/003_create_internal_messaging.sql</span>{" "}
                in Supabase SQL Editor.
              </p>
            )}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex items-center gap-3 text-sm text-white/55">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading messages…
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full min-h-[280px] items-center justify-center text-sm text-white/45">
              No messages yet. Join the room and send the first message.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => {
                const isSelf = message.operatorId === joinedOperatorId;

                return (
                  <div
                    key={message.id}
                    className={cn("flex", isSelf ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[min(100%,640px)] rounded-2xl border px-4 py-3",
                        isSelf
                          ? "border-sky-400/30 bg-sky-500/15"
                          : "border-white/10 bg-white/[0.04]",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">{message.operatorName}</p>
                        <p className="font-mono text-[10px] text-white/35">@{message.username}</p>
                        <p className="text-[10px] text-white/30">
                          {formatMessageTime(message.createdAt)}
                        </p>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => void handleSend(event)}
          className="border-t border-white/10 px-5 py-4"
        >
          <div className="flex gap-3">
            <textarea
              rows={2}
              value={draft}
              disabled={!joinedOperator || sending}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend(event);
                }
              }}
              placeholder={
                joinedOperator
                  ? `Message as ${joinedOperator.fullName}…`
                  : "Join as an operator to send messages"
              }
              className="min-h-[52px] flex-1 resize-y rounded-xl border border-white/10 bg-[#0b1524] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-400/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!joinedOperator || sending || !draft.trim()}
              className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#2563eb] text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-50"
              aria-label="Send message"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
