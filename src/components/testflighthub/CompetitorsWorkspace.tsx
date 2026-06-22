"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  COMPETITOR_REGIONS,
  type Competitor,
  type CompetitorRegion,
} from "@/lib/competitors-data";
import { cn } from "@/lib/utils";
import { Binoculars, ChevronRight, ExternalLink, Loader2, Plus, Trash2, X } from "lucide-react";

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

function selectClassName() {
  return "h-10 w-full min-w-[160px] rounded-xl border border-white/10 bg-[#0b1524] px-3 text-sm text-white outline-none transition-colors focus:border-sky-400/50 sm:w-auto";
}

function truncatePreview(value: string, max = 80) {
  const trimmed = value.trim();
  if (!trimmed) return "—";
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

function formatWebsiteHref(website: string) {
  const trimmed = website.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default function CompetitorsWorkspace() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<CompetitorRegion>("uk");
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const regionMeta = useMemo(
    () => COMPETITOR_REGIONS.find((region) => region.id === selectedRegion) ?? COMPETITOR_REGIONS[0],
    [selectedRegion],
  );

  const regionCompetitors = useMemo(
    () => competitors.filter((competitor) => competitor.region === selectedRegion),
    [competitors, selectedRegion],
  );

  const selectedCompetitor = useMemo(
    () => regionCompetitors.find((competitor) => competitor.id === selectedCompetitorId) ?? null,
    [regionCompetitors, selectedCompetitorId],
  );

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
    setSelectedCompetitorId((current) => {
      if (current && regionCompetitors.some((competitor) => competitor.id === current)) {
        return current;
      }
      return null;
    });
  }, [regionCompetitors]);

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

  function patchCompetitor(
    id: string,
    patch: Partial<Pick<Competitor, "companyName" | "website" | "services" | "lastRevenue" | "notes">>,
  ) {
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

  async function handleAddCompetitor() {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: selectedRegion }),
      });

      const data = await readApiJson<{ competitor?: Competitor; error?: string }>(response);
      if (!response.ok || !data.competitor) throw new Error(data.error ?? "Failed to create competitor");

      setCompetitors((current) => [...current, data.competitor!]);
      setSelectedCompetitorId(data.competitor.id);
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

      const remaining = competitors.filter((item) => item.id !== competitor.id);
      setCompetitors(remaining);
      setSelectedCompetitorId((current) => {
        if (current !== competitor.id) return current;
        return remaining.find((item) => item.region === selectedRegion)?.id ?? null;
      });
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete competitor");
    } finally {
      setBusy(false);
    }
  }

  const websiteHref = selectedCompetitor ? formatWebsiteHref(selectedCompetitor.website) : null;

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa]">
              <Binoculars className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Competitors</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/50">
                Select a country, review listed rivals, and open any row for full company details.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-end gap-3 sm:w-auto">
            <div className="min-w-[160px] flex-1 sm:flex-none">
              <FieldLabel>Country</FieldLabel>
              <select
                value={selectedRegion}
                onChange={(event) => setSelectedRegion(event.target.value as CompetitorRegion)}
                className={selectClassName()}
              >
                {COMPETITOR_REGIONS.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => void handleAddCompetitor()}
              disabled={busy}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/15 px-4 text-sm font-semibold text-sky-300 transition-colors hover:border-sky-400/60 hover:bg-sky-500/25 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <h3 className="text-sm font-semibold text-white sm:text-[15px]">{regionMeta.title}</h3>
            <p className="mt-0.5 text-xs text-white/45">{regionMeta.subtitle}</p>
          </div>
          <p className="text-xs text-white/45">
            {loading ? "Loading…" : `${regionCompetitors.length} listed`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 px-4 py-10 text-sm text-white/55 sm:px-5">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading competitors…
          </div>
        ) : regionCompetitors.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-white/40 sm:px-5">
            No competitors listed for {regionMeta.title} yet. Click Add to create one.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {regionCompetitors.map((competitor) => {
              const selected = competitor.id === selectedCompetitorId;

              return (
                <li key={competitor.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedCompetitorId(competitor.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-4 text-left transition-colors sm:px-5",
                      selected
                        ? "bg-sky-500/10"
                        : "hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <p className="min-w-[140px] truncate text-sm font-semibold text-white">
                          {competitor.companyName}
                        </p>
                        <p className="min-w-[120px] truncate text-xs text-white/45">
                          {competitor.website.trim() || "No website"}
                        </p>
                        <p className="min-w-[120px] truncate text-xs text-white/45">
                          {truncatePreview(competitor.services, 48)}
                        </p>
                        <p className="truncate text-xs text-white/45">
                          {competitor.lastRevenue.trim() || "Revenue unknown"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {selectedCompetitor && (
        <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                Competitor details
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">{selectedCompetitor.companyName}</h3>
              <p className="mt-1 text-sm text-white/45">{regionMeta.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handleDeleteCompetitor(selectedCompetitor)}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-red-200 transition-colors hover:border-red-400/30 hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
              <button
                type="button"
                onClick={() => setSelectedCompetitorId(null)}
                className="rounded-lg border border-white/10 p-2 text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
                aria-label="Close competitor details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Company name</FieldLabel>
              <input
                value={selectedCompetitor.companyName}
                onChange={(event) =>
                  patchCompetitor(selectedCompetitor.id, { companyName: event.target.value })
                }
                className={inputClassName()}
              />
            </div>

            <div>
              <FieldLabel>Website</FieldLabel>
              <div className="relative">
                <input
                  value={selectedCompetitor.website}
                  onChange={(event) =>
                    patchCompetitor(selectedCompetitor.id, { website: event.target.value })
                  }
                  placeholder="example.com"
                  className={inputClassName()}
                />
                {websiteHref && (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/40 transition-colors hover:text-sky-300"
                    aria-label={`Open ${selectedCompetitor.companyName} website`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div>
              <FieldLabel>Last revenue</FieldLabel>
              <input
                value={selectedCompetitor.lastRevenue}
                onChange={(event) =>
                  patchCompetitor(selectedCompetitor.id, { lastRevenue: event.target.value })
                }
                placeholder="e.g. £2.4M (2024)"
                className={inputClassName()}
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Services</FieldLabel>
            <textarea
              value={selectedCompetitor.services}
              rows={4}
              placeholder="Surveying, inspection, media…"
              onChange={(event) =>
                patchCompetitor(selectedCompetitor.id, { services: event.target.value })
              }
              className={textareaClassName()}
            />
          </div>

          <div className="mt-4">
            <FieldLabel>Notes</FieldLabel>
            <textarea
              value={selectedCompetitor.notes}
              rows={4}
              placeholder="Intel, pricing, strengths, weaknesses…"
              onChange={(event) =>
                patchCompetitor(selectedCompetitor.id, { notes: event.target.value })
              }
              className={textareaClassName()}
            />
          </div>
        </section>
      )}
    </section>
  );
}
