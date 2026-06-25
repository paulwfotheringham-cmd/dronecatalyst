import HeroVideoBackground from "@/components/home/HeroVideoBackground";
import ContactForm from "@/components/ui/ContactForm";
import { CONTACT } from "@/lib/site";
import type { ReactNode } from "react";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <span className="h-px w-12 bg-[#3b82f6] sm:w-20" aria-hidden />
      <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">
        {children}
      </p>
      <span className="h-px w-12 bg-[#3b82f6] sm:w-20" aria-hidden />
    </div>
  );
}

export default function ContactPageContent() {
  return (
    <section className="relative overflow-x-hidden bg-[#020617]">
      <HeroVideoBackground />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.38) 42%, rgba(0, 0, 0, 0.12) 68%, transparent 82%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-[104px] lg:px-10 lg:pb-28 lg:pt-[120px]">
        <SectionTitle>Get in Touch</SectionTitle>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
          Share your project scope, location and timeline. We respond within one business day.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">Direct contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <span className="block text-white/55">Email</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-white transition-colors hover:text-[#60a5fa]"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="block text-white/55">Location</span>
                <p className="font-medium text-white/88">{CONTACT.location}</p>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ContactForm variant="marketing" />
          </div>
        </div>
      </div>
    </section>
  );
}
