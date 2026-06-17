import Image from "next/image";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import FeatureGrid from "@/components/ui/FeatureGrid";
import IndustryCard from "@/components/ui/IndustryCard";
import ServiceCard from "@/components/ui/ServiceCard";
import { HOME_INDUSTRIES, HOME_SERVICES, WHY_US } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Aerial Intelligence for Inspection, Surveying & Commercial Imaging"
        subtitle={SITE_DESCRIPTION}
        image="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Aerial landscape at golden hour"
        primaryCta={{ label: "Get a Quote", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "#services" }}
      />

      <section id="services" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Services"
            title="Precision capture across every vertical"
            description="Industrial inspection, survey-grade mapping and premium commercial imaging — delivered with consistent quality and fast turnaround."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HOME_SERVICES.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Industries"
            title="Built for complex operational environments"
            description="From energy corridors to luxury hospitality — we adapt capture workflows to your sector requirements."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.title} {...industry} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Why DroneCatalyst"
                title="Operational excellence, end to end"
                description={SITE_TAGLINE}
              />
              <div className="mt-10">
                <FeatureGrid items={WHY_US} columns={2} />
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                alt="Technology and data visualization"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
