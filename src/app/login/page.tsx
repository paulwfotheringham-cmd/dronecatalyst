import type { Metadata } from "next";

import LoginPageContent from "@/components/auth/LoginPageContent";
import JsonLd from "@/components/JsonLd";
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
      <LoginPageContent />
    </>
  );
}
