"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { MapPin, Pickaxe } from "lucide-react";

import {
  formatEmployeeCount,
  formatMiningRevenue,
  getMiningCountryMeta,
  MINING_COUNTRIES,
  MINING_OPERATORS_BY_COUNTRY,
  type MiningCountry,
} from "@/lib/mining-sector-data";
import { cn } from "@/lib/utils";

const MiningOperatorsMap = dynamic(() => import("./MiningOperatorsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(48vh,420px)] items-center justify-center rounded-xl border border-white/10 bg-[#0b1524] text-sm text-white/50">
      Loading map…
    </div>
  ),
});

function selectClassName() {
  return "h-10 w-full min-w-[180px] rounded-xl border border-white/10 bg-[#0b1524] px-3 text-sm text-white outline-none transition-colors focus:border-sky-400/50 sm:w-auto";
}

export default function MiningSectorWorkspace() {
  const [selectedCountry, setSelectedCountry] = useState<MiningCountry>("spain");

  const countryMeta = useMemo(() => getMiningCountryMeta(selectedCountry), [selectedCountry]);
  const operators = useMemo(
    () => MINING_OPERATORS_BY_COUNTRY[selectedCountry],
    [selectedCountry],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
              Sector Intelligence
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Pickaxe className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">Mining Operators</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Top ten mine operators by revenue and workforce size. Includes primary commodity,
              headquarters, drone technology partners, and site locations.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="mining-country-select"
              className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45"
            >
              Country
            </label>
            <select
              id="mining-country-select"
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value as MiningCountry)}
              className={selectClassName()}
            >
              {MINING_COUNTRIES.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-400" />
            <h3 className="text-base font-semibold text-white">
              {countryMeta.label} · Operator Locations
            </h3>
          </div>
          <p className="text-xs text-white/45">
            Satellite imagery with terrain relief · click markers for site detail
          </p>
        </div>

        <div className="mt-4">
          <MiningOperatorsMap
            operators={operators}
            center={countryMeta.mapCenter}
            zoom={countryMeta.mapZoom}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
        <h3 className="text-base font-semibold text-white">
          Top 10 Operators · {countryMeta.label}
        </h3>
        <p className="mt-1 text-sm text-white/55">Ranked by estimated annual revenue (USD).</p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[72rem] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {[
                  "#",
                  "Company",
                  "Commodity",
                  "Revenue",
                  "Employees",
                  "HQ / Region",
                  "Primary Site",
                  "Drone Providers",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {operators.map((operator) => (
                <tr key={operator.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-3 py-3 font-mono text-white/70">{operator.rank}</td>
                  <td className="px-3 py-3 font-medium text-white">{operator.companyName}</td>
                  <td className="px-3 py-3 text-white/70">{operator.primaryCommodity}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-emerald-300/90">
                    {formatMiningRevenue(operator.annualRevenueUsdM)}
                  </td>
                  <td className="px-3 py-3 font-mono text-white/70">
                    {formatEmployeeCount(operator.employees)}
                  </td>
                  <td className="px-3 py-3 text-white/70">{operator.headquarters}</td>
                  <td className="px-3 py-3 text-white/60">{operator.siteLabel}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {operator.droneProviders.map((provider) => (
                        <span
                          key={provider}
                          className={cn(
                            "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            provider.includes("DJI")
                              ? "border-sky-400/30 bg-sky-500/10 text-sky-200"
                              : provider.includes("Wingtra") || provider.includes("senseFly")
                                ? "border-violet-400/30 bg-violet-500/10 text-violet-200"
                                : provider.includes("Flyability")
                                  ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
                                  : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
                          )}
                        >
                          {provider}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
