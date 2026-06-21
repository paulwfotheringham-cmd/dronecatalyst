"use client";

import { useMemo } from "react";

import {
  ASSET_HOME_BASE_OPTIONS,
  ASSET_STATUS_OPTIONS,
  CONTROL_SOURCE_OPTIONS,
  createBlankAsset,
  DRONE_MODEL_OPTIONS,
  FIRMWARE_VERSION_OPTIONS,
  formatAssetDate,
  RTK_CALIBRATION_OPTIONS,
  assetStatusClass,
  type ManagedAsset,
} from "@/lib/asset-management-data";
import type { ManagedClient } from "@/lib/client-management-data";
import { cn } from "@/lib/utils";

type AssetManagementWorkspaceProps = {
  assets: ManagedAsset[];
  clients: ManagedClient[];
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
  onAssetsChange: (assets: ManagedAsset[]) => void;
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

function selectClassName() {
  return inputClassName();
}

export default function AssetManagementWorkspace({
  assets,
  clients,
  selectedAssetId,
  onSelectAsset,
  onAssetsChange,
}: AssetManagementWorkspaceProps) {
  const selectedAsset = useMemo(
    () => assets.find((asset) => asset.id === selectedAssetId) ?? assets[0],
    [assets, selectedAssetId],
  );

  function updateAsset(updated: ManagedAsset) {
    onAssetsChange(assets.map((asset) => (asset.id === updated.id ? updated : asset)));
  }

  function handleAddAsset() {
    const next = createBlankAsset();
    onAssetsChange([next, ...assets]);
    onSelectAsset(next.id);
  }

  function patchSelected(patch: Partial<ManagedAsset>) {
    if (!selectedAsset) return;
    updateAsset({ ...selectedAsset, ...patch });
  }

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.companyName,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Assets</h2>
              <p className="mt-1 text-xs text-white/45">DJI Matrice 4T fleet registry</p>
            </div>
            <button
              type="button"
              onClick={handleAddAsset}
              className="inline-flex h-9 items-center rounded-xl border border-sky-500/40 bg-sky-500/15 px-3 text-xs font-semibold text-sky-300 transition-colors hover:border-sky-400/60 hover:bg-sky-500/25"
            >
              Add Asset
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {assets.map((asset) => {
              const selected = asset.id === selectedAsset?.id;
              const clientName =
                clients.find((client) => client.id === asset.assignedClientId)?.companyName ??
                "Unassigned";

              return (
                <li key={asset.id}>
                  <button
                    type="button"
                    onClick={() => onSelectAsset(asset.id)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-sky-400/40 bg-sky-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-sm font-semibold text-white">{asset.assetTag}</p>
                        <p className="mt-1 text-xs text-white/45">
                          {asset.model} · {asset.homeBase}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/35">{clientName}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]",
                          assetStatusClass(asset.operationalStatus),
                        )}
                      >
                        {asset.operationalStatus}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {selectedAsset && (
          <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Matrice 4T Asset
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">{selectedAsset.assetTag || "New Asset"}</h2>
                <p className="mt-1 text-sm text-white/50">
                  Purchased {formatAssetDate(selectedAsset.purchaseDate)} · {selectedAsset.homeBase}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                  assetStatusClass(selectedAsset.operationalStatus),
                )}
              >
                {selectedAsset.operationalStatus}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Asset Tag</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedAsset.assetTag}
                  onChange={(event) => patchSelected({ assetTag: event.target.value })}
                  placeholder="DC-M4T-BCN"
                />
              </div>
              <div>
                <FieldLabel>Serial Number</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedAsset.serialNumber}
                  onChange={(event) => patchSelected({ serialNumber: event.target.value })}
                  placeholder="1581F5BKD22800123456"
                />
              </div>
              <div>
                <FieldLabel>Model</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.model}
                  onChange={(event) =>
                    patchSelected({ model: event.target.value as ManagedAsset["model"] })
                  }
                >
                  {DRONE_MODEL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Home Base</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.homeBase}
                  onChange={(event) =>
                    patchSelected({ homeBase: event.target.value as ManagedAsset["homeBase"] })
                  }
                >
                  {ASSET_HOME_BASE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Operational Status</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.operationalStatus}
                  onChange={(event) =>
                    patchSelected({
                      operationalStatus: event.target.value as ManagedAsset["operationalStatus"],
                    })
                  }
                >
                  {ASSET_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Purchase Date</FieldLabel>
                <input
                  type="date"
                  className={inputClassName()}
                  value={selectedAsset.purchaseDate}
                  onChange={(event) => patchSelected({ purchaseDate: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Firmware Version</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.firmwareVersion}
                  onChange={(event) => patchSelected({ firmwareVersion: event.target.value })}
                >
                  {FIRMWARE_VERSION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>D-RTK 3 Base Serial</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedAsset.drtk3BaseSerial}
                  onChange={(event) => patchSelected({ drtk3BaseSerial: event.target.value })}
                  placeholder="DRTK3-BCN-0041"
                />
              </div>
              <div>
                <FieldLabel>RTK Calibration Mode</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.rtkCalibrationMode}
                  onChange={(event) =>
                    patchSelected({
                      rtkCalibrationMode: event.target.value as ManagedAsset["rtkCalibrationMode"],
                    })
                  }
                >
                  {RTK_CALIBRATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Control Source</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.controlSource}
                  onChange={(event) =>
                    patchSelected({
                      controlSource: event.target.value as ManagedAsset["controlSource"],
                    })
                  }
                >
                  {CONTROL_SOURCE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Assigned Client</FieldLabel>
                <select
                  className={selectClassName()}
                  value={selectedAsset.assignedClientId ?? ""}
                  onChange={(event) =>
                    patchSelected({
                      assignedClientId: event.target.value || null,
                    })
                  }
                >
                  <option value="">Unassigned</option>
                  {clientOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Insurance Expiry</FieldLabel>
                <input
                  type="date"
                  className={inputClassName()}
                  value={selectedAsset.insuranceExpiry}
                  onChange={(event) => patchSelected({ insuranceExpiry: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Last Maintenance</FieldLabel>
                <input
                  type="date"
                  className={inputClassName()}
                  value={selectedAsset.lastMaintenanceDate}
                  onChange={(event) => patchSelected({ lastMaintenanceDate: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Next Maintenance Due</FieldLabel>
                <input
                  type="date"
                  className={inputClassName()}
                  value={selectedAsset.nextMaintenanceDue}
                  onChange={(event) => patchSelected({ nextMaintenanceDue: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Total Flight Hours</FieldLabel>
                <input
                  type="number"
                  min={0}
                  className={inputClassName()}
                  value={selectedAsset.totalFlightHours}
                  onChange={(event) =>
                    patchSelected({ totalFlightHours: Number(event.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <FieldLabel>Storage Used (GB)</FieldLabel>
                <input
                  type="number"
                  min={0}
                  className={inputClassName()}
                  value={selectedAsset.storageUsedGb}
                  onChange={(event) =>
                    patchSelected({ storageUsedGb: Number(event.target.value) || 0 })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Notes</FieldLabel>
                <textarea
                  rows={3}
                  className={cn(inputClassName(), "resize-y")}
                  value={selectedAsset.notes}
                  onChange={(event) => patchSelected({ notes: event.target.value })}
                  placeholder="Payload configuration, maintenance notes, deployment restrictions…"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
