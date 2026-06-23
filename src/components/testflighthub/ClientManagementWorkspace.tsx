"use client";

import Link from "next/link";
import { useMemo } from "react";

import {
  CLIENT_CONTRACT_OPTIONS,
  CLIENT_INDUSTRY_OPTIONS,
  CLIENT_REGION_OPTIONS,
  CLIENT_STATUS_OPTIONS,
  clientStatusClass,
  createBlankClient,
  type ManagedClient,
} from "@/lib/client-management-data";
import { cn } from "@/lib/utils";
import ResponsiveMasterDetail, { useMobileDetailPanel } from "@/components/ui/ResponsiveMasterDetail";
import { ExternalLink } from "lucide-react";

type ClientManagementWorkspaceProps = {
  clients: ManagedClient[];
  selectedClientId: string;
  onSelectClient: (clientId: string) => void;
  onClientsChange: (clients: ManagedClient[]) => void;
};

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

export default function ClientManagementWorkspace({
  clients,
  selectedClientId,
  onSelectClient,
  onClientsChange,
}: ClientManagementWorkspaceProps) {
  const { showDetail, openDetail, closeDetail } = useMobileDetailPanel();
  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId) ?? clients[0],
    [clients, selectedClientId],
  );

  function updateClient(updated: ManagedClient) {
    onClientsChange(clients.map((client) => (client.id === updated.id ? updated : client)));
  }

  function handleAddClient() {
    const next = createBlankClient();
    onClientsChange([next, ...clients]);
    onSelectClient(next.id);
    openDetail();
  }

  function patchSelected(patch: Partial<ManagedClient>) {
    if (!selectedClient) return;
    updateClient({ ...selectedClient, ...patch });
  }

  return (
    <div className="space-y-6">
      <ResponsiveMasterDetail
        showDetail={showDetail && !!selectedClient}
        onBack={closeDetail}
        backLabel="Back to clients"
        master={
        <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Clients</h2>
              <p className="mt-1 text-xs text-white/45">{clients.length} accounts</p>
            </div>
            <button
              type="button"
              onClick={handleAddClient}
              className="inline-flex h-9 items-center rounded-xl border border-sky-500/40 bg-sky-500/15 px-3 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400/60 hover:bg-sky-500/25"
            >
              Add Client
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {clients.map((client) => {
              const selected = client.id === selectedClient?.id;

              return (
                <li key={client.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectClient(client.id);
                      openDetail();
                    }}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-sky-400/40 bg-sky-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{client.companyName}</p>
                        <p className="mt-1 text-xs text-white/45">
                          {client.industry} · {client.region}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/35">{client.primaryContact}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]",
                          clientStatusClass(client.accountStatus),
                        )}
                      >
                        {client.accountStatus}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        }
        detail={
        selectedClient ? (
          <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Client Record
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  {selectedClient.companyName || "New Client"}
                </h2>
                <p className="mt-1 text-sm text-white/50">{selectedClient.region}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedClient.platformUrl && (
                  <Link
                    href={selectedClient.platformUrl}
                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/15 px-3 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400/60 hover:bg-sky-500/25"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open Intelligence Platform
                  </Link>
                )}
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                    clientStatusClass(selectedClient.accountStatus),
                  )}
                >
                  {selectedClient.accountStatus}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel>Company Name</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedClient.companyName}
                  onChange={(event) => patchSelected({ companyName: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Industry</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedClient.industry}
                  onChange={(event) =>
                    patchSelected({ industry: event.target.value as ManagedClient["industry"] })
                  }
                >
                  {CLIENT_INDUSTRY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Region</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedClient.region}
                  onChange={(event) =>
                    patchSelected({ region: event.target.value as ManagedClient["region"] })
                  }
                >
                  {CLIENT_REGION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Primary Contact</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedClient.primaryContact}
                  onChange={(event) => patchSelected({ primaryContact: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  className={inputClassName()}
                  value={selectedClient.email}
                  onChange={(event) => patchSelected({ email: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedClient.phone}
                  onChange={(event) => patchSelected({ phone: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Account Status</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedClient.accountStatus}
                  onChange={(event) =>
                    patchSelected({
                      accountStatus: event.target.value as ManagedClient["accountStatus"],
                    })
                  }
                >
                  {CLIENT_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Contract Type</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedClient.contractType}
                  onChange={(event) =>
                    patchSelected({
                      contractType: event.target.value as ManagedClient["contractType"],
                    })
                  }
                >
                  {CLIENT_CONTRACT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Tax / VAT ID</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedClient.taxId}
                  onChange={(event) => patchSelected({ taxId: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Active Projects</FieldLabel>
                <input
                  type="number"
                  min={0}
                  className={inputClassName()}
                  value={selectedClient.activeProjects}
                  onChange={(event) =>
                    patchSelected({ activeProjects: Number(event.target.value) || 0 })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Billing Address</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedClient.billingAddress}
                  onChange={(event) => patchSelected({ billingAddress: event.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Notes</FieldLabel>
                <textarea
                  rows={3}
                  className={cn(inputClassName(), "resize-y")}
                  value={selectedClient.notes}
                  onChange={(event) => patchSelected({ notes: event.target.value })}
                />
              </div>
            </div>
          </section>
        ) : null
        }
      />
    </div>
  );
}
