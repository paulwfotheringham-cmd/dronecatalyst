import Link from "next/link";

const OFFERS = [
  {
    title: "Surveying & Geospatial Intelligence",
    description:
      "Survey-grade mapping, orthomosaics and progress monitoring designed for technical teams and stakeholder reporting.",
    href: "/surveying",
  },
  {
    title: "Inspection & Asset Intelligence",
    description:
      "High-resolution inspection programs for infrastructure, energy and construction assets — with clear findings and reporting.",
    href: "/inspection",
  },
  {
    title: "Premium Media & Broadcast",
    description:
      "High-end commercial imaging for production teams, brands and premium environments — precise framing, consistent delivery.",
    href: "/commercial-imaging",
  },
] as const;

export default function WhatWeOffer() {
  return (
    <section id="services" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
              WHAT WE CAN OFFER
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {OFFERS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-border bg-[#F3F0E9] p-8 text-[#0b2d63] shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#0b2d63]/70">
                {item.description}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b2d63]">
                Learn more
                <span className="transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

