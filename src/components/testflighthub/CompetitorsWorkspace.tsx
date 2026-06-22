"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  COMPETITOR_REGIONS,
  type Competitor,
  type CompetitorRegion,
} from "@/lib/competitors-data";
import { cn } from "@/lib/utils";
import {
  Binoculars,
  Check,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error(`Request failed (${response.status})`);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

type CompetitorDraft = Pick<
  Competitor,
  "companyName" | "website" | "services" | "lastRevenue" | "notes"
>;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
      {children}
    </label>
  );
}

function cellInputClassName() {
  return "w-full rounded-lg border border-white/10 bg-[#0b1524] px-2.5 py-2 text-sm text-white outline-none transition-colors focus:border-sky-400/50";
}

function selectClassName() {
  return "h-10 w-full min-w-[160px] rounded-xl border border-white/10 bg-[#0b1524] px-3 text-sm text-white outline-none transition-colors focus:border-sky-400/50 sm:w-auto";
}

function formatWebsiteHref(website: string) {
  const trimmed = website.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const TABLE_GRID =
  "grid grid-cols-[minmax(140px,1.1fr)_minmax(140px,1fr)_minmax(180px,1.4fr)_minmax(120px,0.9fr)_5.5rem] gap-3";

export default function CompetitorsWorkspace() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<CompetitorRegion>("uk");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CompetitorDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const regionMeta = useMemo(
    () => COMPETITOR_REGIONS.find((region) => region.id === selectedRegion) ?? COMPETITOR_REGIONS[0],
    [selectedRegion],
  );

  const regionCompetitors = useMemo(
    () =>
      competitors
        .filter((competitor) => competitor.region === selectedRegion)
        .sort((a, b) => a.sortOrder - b.sortOrder || a.companyName.localeCompare(b.companyName)),
    [competitors, selectedRegion],
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
    setEditingId(null);
    setDraft(null);
  }, [selectedRegion]);

  function startEdit(competitor: Competitor) {
    setEditingId(competitor.id);
    setDraft({
      companyName: competitor.companyName,
      website: competitor.website,
      services: competitor.services,
      lastRevenue: competitor.lastRevenue,
      notes: competitor.notes,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  function patchDraft(patch: Partial<CompetitorDraft>) {
    setDraft((current) => (current ? { ...current, ...patch } : current));
  }

  async function saveEdit(competitorId: string) {
    if (!draft) return;

    setSavingId(competitorId);
    setError(null);

    try {
      const response = await fetch(`/api/competitors/${competitorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: draft.companyName,
          website: draft.website,
          services: draft.services,
          lastRevenue: draft.lastRevenue,
          notes: draft.notes,
        }),
      });

      const data = await readApiJson<{ competitor?: Competitor; error?: string }>(response);
      if (!response.ok || !data.competitor) throw new Error(data.error ?? "Failed to save");

      setCompetitors((current) =>
        current.map((row) => (row.id === data.competitor!.id ? data.competitor! : row)),
      );
      cancelEdit();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save");
    } finally {
      setSavingId(null);
    }
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
      startEdit(data.competitor!);
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
      if (editingId === competitor.id) cancelEdit();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete competitor");
    } finally {
      setBusy(false);
    }
  }

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
                Select UK, Spain, or Portugal to view rivals in columns. Click Edit on any row to
                update name, website, services, and revenue.
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

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
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
          <div className="overflow-x-auto">
            <div className="min-w-[920px]">
              <div
                className={cn(
                  TABLE_GRID,
                  "border-b border-white/10 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40 sm:px-5",
                )}
              >
                <span>Name</span>
                <span>Website</span>
                <span>Services</span>
                <span>Revenue</span>
                <span className="text-right">Edit</span>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {regionCompetitors.map((competitor) => {
                  const isEditing = editingId === competitor.id;
                  const href = formatWebsiteHref(isEditing ? draft?.website ?? "" : competitor.website);
                  const row = isEditing && draft ? draft : competitor;

                  return (
                    <div key={competitor.id} className="px-4 py-3 sm:px-5">
                      <div className={cn(TABLE_GRID, "items-start")}>
                        <div>
                          {isEditing ? (
                            <input
                              value={row.companyName}
                              onChange={(event) => patchDraft({ companyName: event.target.value })}
                              className={cellInputClassName()}
                            />
                          ) : (
                            <p className="text-sm font-semibold leading-snug text-white">
                              {competitor.companyName}
                            </p>
                          )}
                        </div>

                        <div>
                          {isEditing ? (
                            <input
                              value={row.website}
                              onChange={(event) => patchDraft({ website: event.target.value })}
                              placeholder="example.com"
                              className={cellInputClassName()}
                            />
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-sm text-white/70">
                                {competitor.website.trim() || "—"}
                              </p>
                              {href && (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 rounded-md p-1 text-white/40 transition-colors hover:text-sky-300"
                                  aria-label={`Open ${competitor.companyName} website`}
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          {isEditing ? (
                            <textarea
                              value={row.services}
                              rows={2}
                              onChange={(event) => patchDraft({ services: event.target.value })}
                              className={cn(cellInputClassName(), "min-h-[3.25rem] resize-y")}
                            />
                          ) : (
                            <p className="text-sm leading-relaxed text-white/65">
                              {competitor.services.trim() || "—"}
                            </p>
                          )}
                        </div>

                        <div>
                          {isEditing ? (
                            <input
                              value={row.lastRevenue}
                              onChange={(event) => patchDraft({ lastRevenue: event.target.value })}
                              placeholder="e.g. £2.4M (2024)"
                              className={cellInputClassName()}
                            />
                          ) : (
                            <p className="text-sm text-white/70">
                              {competitor.lastRevenue.trim() || "—"}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => void saveEdit(competitor.id)}
                                disabled={savingId === competitor.id}
                                className="rounded-lg border border-sky-500/40 bg-sky-500/15 p-2 text-sky-300 transition-colors hover:bg-sky-500/25 disabled:opacity-50"
                                aria-label={`Save ${competitor.companyName}`}
                              >
                                {savingId === competitor.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="rounded-lg border border-white/10 p-2 text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
                                aria-label="Cancel edit"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => startEdit(competitor)}
                                className="rounded-lg border border-white/10 p-2 text-white/45 transition-colors hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-sky-200"
                                aria-label={`Edit ${competitor.companyName}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeleteCompetitor(competitor)}
                                disabled={busy}
                                className="rounded-lg border border-white/10 p-2 text-white/45 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
                                aria-label={`Delete ${competitor.companyName}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {isEditing && draft && (
                        <div className="mt-3 border-t border-white/[0.06] pt-3">
                          <FieldLabel>Notes</FieldLabel>
                          <textarea
                            value={draft.notes}
                            rows={2}
                            onChange={(event) => patchDraft({ notes: event.target.value })}
                            placeholder="Intel, pricing, strengths, weaknesses…"
                            className={cn(cellInputClassName(), "mt-1.5 min-h-[3.25rem] resize-y")}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
