"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  formatEmailDate,
  formatEmailDateLong,
  INFO_EMAIL_ADDRESS,
  INFO_EMAIL_PROVIDER,
  threadStatusClass,
  threadStatusLabel,
  type InfoEmailThread,
} from "@/lib/info-email-data";
import { createInitialUsers } from "@/lib/user-management-data";
import { cn } from "@/lib/utils";
import { Inbox, Loader2, Mail, Reply, Send } from "lucide-react";

const operators = createInitialUsers();

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error(`Request failed (${response.status})`);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

function inputClassName() {
  return "w-full rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm text-white outline-none focus:border-sky-400/50";
}

export default function InfoEmailWorkspace() {
  const [threads, setThreads] = useState<InfoEmailThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyAsUserId, setReplyAsUserId] = useState(operators[0]?.id ?? "");

  const selectedThread = useMemo(
    () => threads.find((thread) => thread.id === selectedThreadId) ?? threads[0] ?? null,
    [threads, selectedThreadId],
  );

  const replyAsUser = operators.find((operator) => operator.id === replyAsUserId);

  const loadThreads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/info-email/threads", { cache: "no-store" });
      const data = await readApiJson<{ threads?: InfoEmailThread[]; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to load inbox");

      const nextThreads = data.threads ?? [];
      setThreads(nextThreads);
      setSelectedThreadId((current) => {
        if (current && nextThreads.some((thread) => thread.id === current)) return current;
        return nextThreads[0]?.id ?? null;
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load inbox");
      setThreads([]);
      setSelectedThreadId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadThreads();
  }, [loadThreads]);

  async function sendReply() {
    if (!selectedThread || !replyBody.trim() || !replyAsUser) return;

    setSending(true);
    setError(null);

    try {
      const response = await fetch(`/api/info-email/threads/${selectedThread.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyBody: replyBody.trim(),
          repliedByUserId: replyAsUser.id,
          repliedByName: replyAsUser.fullName,
        }),
      });

      const data = await readApiJson<{ thread?: InfoEmailThread; error?: string }>(response);
      if (!response.ok || !data.thread) throw new Error(data.error ?? "Failed to send reply");

      setThreads((current) =>
        current.map((thread) => (thread.id === data.thread!.id ? data.thread! : thread)),
      );
      setReplyBody("");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-[#0a1422]/80 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/10">
              <Inbox className="h-5 w-5 text-sky-300" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">{INFO_EMAIL_ADDRESS}</h2>
              <p className="text-xs text-white/45">
                Shared inbox · {INFO_EMAIL_PROVIDER} · visible to all operators
              </p>
            </div>
          </div>
          <p className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200">
            Live mailbox not connected yet — preview data only
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      <div className="grid min-h-[32rem] gap-4 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-[#0a1422]/80">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
              Inbox
            </p>
            <p className="mt-0.5 text-sm text-white/70">{threads.length} threads</p>
          </div>

          {loading ? (
            <div className="flex flex-1 items-center justify-center py-12 text-white/50">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : threads.length === 0 ? (
            <p className="px-4 py-8 text-sm text-white/45">No messages yet.</p>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto">
              {threads.map((thread) => {
                const active = selectedThread?.id === thread.id;
                const preview = thread.messages[thread.messages.length - 1]?.body ?? "";

                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={cn(
                      "w-full border-b border-white/5 px-4 py-3 text-left transition-colors",
                      active ? "bg-sky-500/10" : "hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-medium text-white">
                        {thread.fromName}
                      </p>
                      <span className="shrink-0 text-[11px] text-white/40">
                        {formatEmailDate(thread.lastActivityAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs font-medium text-white/70">
                      {thread.subject}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-white/45">{preview}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-md border px-1.5 py-0.5 text-[10px]",
                          threadStatusClass(thread.status),
                        )}
                      >
                        {threadStatusLabel(thread.status)}
                      </span>
                      {thread.replyCount > 0 && (
                        <span className="text-[10px] text-white/40">
                          {thread.replyCount} team {thread.replyCount === 1 ? "reply" : "replies"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-[#0a1422]/80">
          {!selectedThread ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center text-white/45">
              <Mail className="h-8 w-8 text-white/25" />
              <p className="text-sm">Select a thread to read the conversation.</p>
            </div>
          ) : (
            <>
              <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                <h3 className="text-lg font-semibold text-white">{selectedThread.subject}</h3>
                <p className="mt-1 text-sm text-white/50">
                  From {selectedThread.fromName} &lt;{selectedThread.fromEmail}&gt;
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  Received {formatEmailDateLong(selectedThread.receivedAt)}
                </p>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                {selectedThread.messages.map((message) => {
                  const isOutbound = message.direction === "outbound";

                  return (
                    <article
                      key={message.id}
                      className={cn(
                        "rounded-xl border px-4 py-3",
                        isOutbound
                          ? "border-sky-400/20 bg-sky-500/5"
                          : "border-white/10 bg-[#0b1524]/70",
                      )}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {message.fromName}
                            {isOutbound && message.repliedByName && (
                              <span className="ml-2 text-xs font-normal text-sky-300">
                                replied for team
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-white/45">
                            {isOutbound ? INFO_EMAIL_ADDRESS : message.fromEmail}
                          </p>
                        </div>
                        <time className="text-xs text-white/40" dateTime={message.sentAt}>
                          {formatEmailDateLong(message.sentAt)}
                        </time>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                        {message.body}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
                  <Reply className="h-4 w-4" />
                  Reply from {INFO_EMAIL_ADDRESS}
                </div>

                <div className="grid gap-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
                      Reply as
                    </label>
                    <select
                      value={replyAsUserId}
                      onChange={(event) => setReplyAsUserId(event.target.value)}
                      className={cn(inputClassName(), "mt-1.5")}
                    >
                      {operators.map((operator) => (
                        <option key={operator.id} value={operator.id}>
                          {operator.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
                      Message
                    </label>
                    <textarea
                      value={replyBody}
                      onChange={(event) => setReplyBody(event.target.value)}
                      rows={4}
                      placeholder="Write a reply visible to the whole team…"
                      className={cn(inputClassName(), "mt-1.5 resize-y")}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={sending || !replyBody.trim()}
                  onClick={() => void sendReply()}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-400 disabled:opacity-60"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send reply
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
