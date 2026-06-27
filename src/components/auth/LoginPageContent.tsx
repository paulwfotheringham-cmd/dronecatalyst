import HeroVideoBackground from "@/components/home/HeroVideoBackground";
import LoginForm from "@/components/auth/LoginForm";
import type { ReactNode } from "react";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <span className="h-px w-[80px] bg-[#3b82f6] sm:w-[140px]" aria-hidden />
      <p className="whitespace-nowrap text-[22px] font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">
        {children}
      </p>
      <span className="h-px w-[80px] bg-[#3b82f6] sm:w-[140px]" aria-hidden />
    </div>
  );
}

export default function LoginPageContent() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-x-hidden bg-[#020617]">
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
        <SectionTitle>Sign In</SectionTitle>

        <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
          Access your client intelligence platform or internal operations workspace with your
          assigned credentials.
        </p>

        <div className="mx-auto mt-12 w-full max-w-md">
          <LoginForm variant="marketing" />
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-white/45">
          Need access or a password reset?{" "}
          <a href="/contact" className="font-medium text-[#93c5fd] underline-offset-2 hover:underline">
            Contact the DroneCatalyst team
          </a>
          .
        </p>
      </div>
    </section>
  );
}
