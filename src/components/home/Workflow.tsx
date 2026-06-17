import Link from "next/link";

const STEPS = [
  "Data Capture",
  "Secure Upload",
  "Processing",
  "Analytics",
  "Your Portal",
  "Actionable Insights",
] as const;

export default function Workflow() {
  return (
    <section id="platform" className="bg-[#050816] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
            The Drone Catalyst Workflow
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The Drone Catalyst Workflow
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            From capture to actionable intelligence.
          </p>
          <div className="h-8" aria-hidden />
        </div>

        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className="rounded-2xl border border-border bg-surface/70 p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                Step {index + 1}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">{label}</p>
              <div className="mt-5 h-[3px] w-10 rounded bg-accent/70" aria-hidden />
            </li>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <Link
            href="/contact"
            className="rounded-xl border border-[#cfe0ff] bg-[#EEF5FF] px-10 py-4 text-sm font-semibold text-[#0b2d63] transition-colors hover:bg-[#e3efff]"
          >
            Contact Us
          </Link>
        </div>

        <div className="h-10 lg:h-12" aria-hidden />
      </div>
    </section>
  );
}

