import Image from "next/image";

const INDUSTRIES = [
  "Construction Companies",
  "Infrastructure Developers",
  "Energy & Utilities",
  "Industrial Facilities",
  "Media & Production",
  "Mining & Quarrying",
  "Ports & Logistics",
  "Waste Management",
  "Maritime & Yachting",
  "Sports & Events",
  "Brands & Agencies",
] as const;

export default function WhoWeWorkWith() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
            WHO WE WORK WITH
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-background/35 p-8 backdrop-blur md:p-10">
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((label) => (
              <div key={label} className="flex items-baseline gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <p className="text-base font-medium text-foreground/90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

