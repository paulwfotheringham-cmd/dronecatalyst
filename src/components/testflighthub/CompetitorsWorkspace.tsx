"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  COMPETITOR_REGIONS,
  type Competitor,
  type CompetitorRegion,
} from "@/lib/competitors-data";
import { Binoculars, ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error(`Request failed (${response.status})`);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
      {children}
    </label>
  );
}

function inputClassName() {
  return "mt-1.5 w-full rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-sky-400/50";
}

function textareaClassName() {
  return "mt-1.5 min-h-[4.5rem] w-full resize-y rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm leading-relaxed text-white outline-none transition-colors focus:border-sky-400/50";
}

export default function CompetitorsWorkspace() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const competitorsByRegion = useMemo(() => {
    const grouped: Record<CompetitorRegion, Competitor[]> = {
      uk: [],
      spain: [],
      portugal: [],
    };

    for (const competitor of competitors) {
      grouped[competitor.region].push(competitor);
    }

    return grouped;
  }, [competitors]);

  const loadCompetitors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/competitors", { cache: "no-store" });
      const data = await readApiJson<{ competitors?: Competitor[]; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to load competitors");
      setCompetitors(data.competitors ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load competitors");
      setCompetitors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCompetitors();
  }, [loadCompetitors]);

  useEffect(() => {
    const timers = saveTimersRef.current;
    return () => {
      for (const timer of timers.values()) {
        clearTimeout(timer);
      }
      timers.clear();
    };
  }, []);

  async function persistCompetitor(competitor: Competitor) {
    setError(null);

    try {
      const response = await fetch(`/api/competitors/${competitor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: competitor.companyName,
          website: competitor.website,
          services: competitor.services,
          lastRevenue: competitor.lastRevenue,
          notes: competitor.notes,
        }),
      });

      const data = await readApiJson<{ competitor?: Competitor; error?: string }>(response);
      if (!response.ok || !data.competitor) throw new Error(data.error ?? "Failed to save");

      setCompetitors((current) =>
        current.map((row) => (row.id === data.competitor!.id ? data.competitor! : row)),
      );
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save");
    }
  }

  function patchCompetitor(id: string, patch: Partial<Pick<Competitor, "companyName" | "website" | "services" | "lastRevenue" | "notes">>) {
    setCompetitors((current) => {
      const next = current.map((item) => (item.id === id ? { ...item, ...patch } : item));
      const updated = next.find((item) => item.id === id);
      if (!updated) return current;

      const timers = saveTimersRef.current;
      const existing = timers.get(id);
      if (existing) clearTimeout(existing);

      timers.set(
        id,
        setTimeout(() => {
          void persistCompetitor(updated);
          timers.delete(id);
        }, 500),
      );

      return next;
    });
  }

  async function handleAddCompetitor(region: CompetitorRegion) {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region }),
      });

      const data = await readApiJson<{ competitor?: Competitor; error?: string }>(response);
      if (!response.ok || !data.competitor) throw new Error(data.error ?? "Failed to create competitor");

      setCompetitors((current) => [...current, data.competitor!]);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create competitor");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteCompetitor(competitor: Competitor) {
    if (!window.confirm(`Delete "${competitor.companyName}"?`)) return;

    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/competitors/${competitor.id}`, { method: "DELETE" });
      const data = await readApiJson<{ error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to delete competitor");

      setCompetitors((current) => current.filter((item) => item.id !== competitor.id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete competitor");
    } finally {
      setBusy(false);
    }
  }

  function formatWebsiteHref(website: string) {
    const trimmed = website.trim();
    if (!trimmed) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa]">
            <Binoculars className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Competitors</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/50">
              Track rival operators across the UK, Spain, and Portugal — company details, services,
              and latest revenue intelligence.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
          {error.includes("competitors") && (
            <>
              {" "}
              If this persists, run{" "}
              <span className="font-mono">supabase/migrations/007_create_competitors.sql</span> in
              Supabase or set <span className="font-mono">SUPABASE_DB_URL</span> on Vercel so the
              table can be created automatically.
            </>
          )}
        </p>
      )}

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-sm text-white/55">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading competitors…
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-3">
          {COMPETITOR_REGIONS.map((column) => {
            const columnItems = competitorsByRegion[column.id];
            const websiteHref = (website: string) => formatWebsiteHref(website);

            return (
              <div
                key={column.id}
                className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-[15px]">{column.title}</h3>
                    <p className="mt-0.5 text-xs text-white/45">{column.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleAddCompetitor(column.id)}
                    disabled={busy}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/[0.08] disabled:opacity-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                  {columnItems.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-sm text-white/40">
                      No competitors yet. Click Add to start tracking.
                    </p>
                  ) : (
                    columnItems.map((competitor) => {
                      const href = websiteHref(competitor.website);

                      return (
                        <article
                          key={competitor.id}
                          className="rounded-xl border border-white/10 bg-[#0b1524]/70 p-4"
                        >
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <FieldLabel>Company name</FieldLabel>
                              <input
                                value={competitor.companyName}
                                onChange={(event) =>
                                  patchCompetitor(competitor.id, { companyName: event.target.value })
                                }
                                className={inputClassName()}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => void handleDeleteCompetitor(competitor)}
                              disabled={busy}
                              className="mt-5 rounded-lg border border-white/10 p-2 text-white/45 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
                              aria-label={`Delete ${competitor.companyName}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div>
                            <FieldLabel>Website</FieldLabel>
                            <div className="relative">
                              <input
                                value={competitor.website}
                                onChange={(event) =>
                                  patchCompetitor(competitor.id, { website: event.target.value })
                                }
                                placeholder="example.com"
                                className={inputClassName()}
                              />
                              {href && (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/40 transition-colors hover:text-sky-300"
                                  aria-label={`Open ${competitor.companyName} website`}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="mt-3">
                            <FieldLabel>Services</FieldLabel>
                            <textarea
                              value={competitor.services}
                              rows={3}
                              placeholder="Surveying, inspection, media…"
                              onChange={(event) =>
                                patchCompetitor(competitor.id, { services: event.target.value })
                              }
                              className={textareaClassName()}
                            />
                          </div>

                          <div className="mt-3">
                            <FieldLabel>Last revenue</FieldLabel>
                            <input
                              value={competitor.lastRevenue}
                              onChange={(event) =>
                                patchCompetitor(competitor.id, { lastRevenue: event.target.value })
                              }
                              placeholder="e.g. £2.4M (2024)"
                              className={inputClassName()}
                            />
                          </div>

                          <div className="mt-3">
                            <FieldLabel>Notes</FieldLabel>
                            <textarea
                              value={competitor.notes}
                              rows={3}
                              placeholder="Intel, pricing, strengths, weaknesses…"
                              onChange={(event) =>
                                patchCompetitor(competitor.id, { notes: event.target.value })
                              }
                              className={textareaClassName()}
                            />
                          </div>
                        </article>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
