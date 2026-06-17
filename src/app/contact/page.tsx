import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/ui/ContactForm";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact DroneCatalyst for drone inspection, surveying and commercial imaging enquiries. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Hero
        compact
        title="Get in Touch"
        subtitle="Share your project scope, location and timeline. We respond within one business day."
      />
      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-foreground">Direct contact</h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <span className="block text-muted">Email</span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
