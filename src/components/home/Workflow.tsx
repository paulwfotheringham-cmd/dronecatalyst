import Link from "next/link";

const STEPS = [
  { label: "Data Capture", icon: "capture" },
  { label: "Secure Upload", icon: "upload" },
  { label: "Processing", icon: "process" },
  { label: "Analytics", icon: "analytics" },
  { label: "Your Portal", icon: "portal" },
  { label: "Actionable Insights", icon: "insights" },
] as const;

function StepIcon({ type }: { type: (typeof STEPS)[number]["icon"] }) {
  const cls = "h-6 w-6 stroke-white";
  switch (type) {
    case "capture":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case "upload":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path d="M12 16V4M8 8l4-4 4 4M4 20h16" />
        </svg>
      );
    case "process":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
        </svg>
      );
    case "portal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 4v16" />
        </svg>
      );
    case "insights":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        </svg>
      );
  }
}

export default function Workflow() {
  return (
    <section id="platform" className="workflow-bg relative overflow-hidden py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The Drone Catalyst Workflow
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            From capture to actionable intelligence.
          </p>
        </div>

        <ol className="mt-16 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-0">
          {STEPS.map((step, index) => (
            <li key={step.label} className="flex flex-col items-center lg:flex-row">
              {index > 0 && (
                <span className="mb-2 text-white/35 lg:mb-0 lg:mx-3 lg:mt-6" aria-hidden>
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30">
                  <StepIcon type={step.icon} />
                </div>
                <p className="mt-4 max-w-[110px] text-center text-sm font-medium text-white/90">
                  {step.label}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex justify-center">
          <Link
            href="/contact"
            className="rounded-md bg-[#e8e8e8] px-10 py-3.5 text-sm font-semibold text-[#0b2d63] transition-colors hover:bg-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
