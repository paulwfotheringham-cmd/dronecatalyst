"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  createBlankConnectionInput,
  CRM_CONNECTION_ROLE_OPTIONS,
  type CrmConnection,
} from "@/lib/connections-data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader2, Plus, Trash2, Users } from "lucide-react";

const ConnectionsMap = dynamic(() => import("./ConnectionsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(52vh,480px)] items-center justify-center rounded-xl border border-white/10 bg-[#0b1524] text-sm text-white/45">
      Loading map…
    </div>
  ),
});

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

type ConnectionsWorkspaceProps = {
  onBackToCrm?: () => void;
};

export default function ConnectionsWorkspace({ onBackToCrm }: ConnectionsWorkspaceProps) {
  const [connections, setConnections] = useState<CrmConnection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selected = useMemo(
    () => connections.find((entry) => entry.id === selectedId) ?? null,
    [connections, selectedId],
  );

  const loadConnections = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/crm/connections", { cache: "no-store" });
      const data = await readApiJson<{ connections?: CrmConnection[]; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to load connections");

      const next = data.connections ?? [];
      setConnections(next);
      setSelectedId((current) => {
        if (current && next.some((entry) => entry.id === current)) return current;
        return next[0]?.id ?? null;
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load connections");
      setConnections([]);
      setSelectedId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadConnections();
  }, [loadConnections]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  async function saveConnection(connection: CrmConnection) {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/crm/connections/${connection.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: connection.name,
          role: connection.role,
          specialties: connection.specialties,
          background: connection.background,
          countryExperience: connection.countryExperience,
          city: connection.city,
          country: connection.country,
        }),
      });

      const data = await readApiJson<{ connection?: CrmConnection; error?: string }>(response);
      if (!response.ok || !data.connection) throw new Error(data.error ?? "Failed to save");

      setConnections((current) =>
        current.map((entry) => (entry.id === data.connection!.id ? data.connection! : entry)),
      );
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  function patchSelected(patch: Partial<CrmConnection>) {
    if (!selected) return;
    const next = { ...selected, ...patch };
    setConnections((current) => current.map((entry) => (entry.id === next.id ? next : entry)));

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void saveConnection(next);
    }, 500);
  }

  async function handleAddContact() {
    setBusy(true);
    setError(null);

    const blank = createBlankConnectionInput();

    try {
      const response = await fetch("/api/crm/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blank,
          name: "New Contact",
        }),
      });

      const data = await readApiJson<{ connection?: CrmConnection; error?: string }>(response);
      if (!response.ok || !data.connection) throw new Error(data.error ?? "Failed to create contact");

      setConnections((current) => [...current, data.connection!].sort((a, b) =>
        a.name.localeCompare(b.name),
      ));
      setSelectedId(data.connection.id);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create contact");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteContact() {
    if (!selected) return;
    if (!window.confirm(`Remove "${selected.name}" from connections?`)) return;

    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/crm/connections/${selected.id}`, { method: "DELETE" });
      const data = await readApiJson<{ error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to delete contact");

      const remaining = connections.filter((entry) => entry.id !== selected.id);
      setConnections(remaining);
      setSelectedId(remaining[0]?.id ?? null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete contact");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {onBackToCrm && (
              <button
                type="button"
                onClick={onBackToCrm}
                className="mt-0.5 inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to CRM
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-white">Connections</h3>
              </div>
              <p className="mt-1 text-xs text-white/45">
                {connections.length} contacts on the global map · hover or click a marker for details
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => void handleAddContact()}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/15 px-3 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400/60 hover:bg-sky-500/25 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            New contact
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
          {error.includes("crm_connections") && (
            <p className="mt-1 text-xs text-red-200/70">
              Run <span className="font-mono">supabase/migrations/017_create_crm_connections.sql</span>{" "}
              in Supabase SQL Editor.
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-sm text-white/55">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading connections map…
        </div>
      ) : (
        <>
          <ConnectionsMap
            connections={connections}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {selected ? (
            <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                    Contact record
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{selected.name}</h2>
                  <p className="mt-1 text-sm text-white/50">
                    {selected.city}, {selected.country}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleDeleteContact()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-red-400/20 px-3 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FieldLabel>Name</FieldLabel>
                  <input
                    className={inputClassName()}
                    value={selected.name}
                    onChange={(event) => patchSelected({ name: event.target.value })}
                    disabled={busy}
                  />
                </div>
                <div>
                  <FieldLabel>Role</FieldLabel>
                  <select
                    className={inputClassName()}
                    value={selected.role}
                    onChange={(event) => patchSelected({ role: event.target.value })}
                    disabled={busy}
                  >
                    {CRM_CONNECTION_ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                    {!CRM_CONNECTION_ROLE_OPTIONS.includes(
                      selected.role as (typeof CRM_CONNECTION_ROLE_OPTIONS)[number],
                    ) && (
                      <option value={selected.role}>{selected.role}</option>
                    )}
                  </select>
                </div>
                <div>
                  <FieldLabel>City</FieldLabel>
                  <input
                    className={inputClassName()}
                    value={selected.city}
                    onChange={(event) => patchSelected({ city: event.target.value })}
                    disabled={busy}
                  />
                </div>
                <div>
                  <FieldLabel>Country</FieldLabel>
                  <input
                    className={inputClassName()}
                    value={selected.country}
                    onChange={(event) => patchSelected({ country: event.target.value })}
                    disabled={busy}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Specialties</FieldLabel>
                  <input
                    className={inputClassName()}
                    value={selected.specialties}
                    onChange={(event) => patchSelected({ specialties: event.target.value })}
                    disabled={busy}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Background</FieldLabel>
                  <textarea
                    rows={3}
                    className={cn(inputClassName(), "resize-y")}
                    value={selected.background}
                    onChange={(event) => patchSelected({ background: event.target.value })}
                    disabled={busy}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Country experience</FieldLabel>
                  <input
                    className={inputClassName()}
                    value={selected.countryExperience}
                    onChange={(event) => patchSelected({ countryExperience: event.target.value })}
                    disabled={busy}
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/45">
              Add a contact or select a marker on the map to edit their details.
            </section>
          )}
        </>
      )}
    </div>
  );
}
