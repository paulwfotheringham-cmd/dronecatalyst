import type { Metadata } from "next";

import LoginForm from "@/components/auth/LoginForm";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Login",
  description: "Sign in to your DroneCatalyst client portal or internal operations workspace.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Login", path: "/login" },
        ])}
      />
      <Hero
        compact
        title="Sign In"
        subtitle="Connect to your client intelligence platform or internal operations workspace."
      />
      <section className="pb-20 lg:pb-24">
        <div className="mx-auto max-w-md px-6">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
