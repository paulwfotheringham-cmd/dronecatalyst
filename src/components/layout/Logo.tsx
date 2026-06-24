import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  height?: number;
  onDark?: boolean;
  href?: string;
};

function LogoMark({ size, onDark }: { size: number; onDark: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        className={onDark ? "fill-white/[0.06] stroke-white/20" : "fill-[#EEF5FF] stroke-[#cfe0ff]"}
        strokeWidth="1"
      />
      <path
        d="M20 10v4M20 26v4M10 20h4M26 20h4"
        className={onDark ? "stroke-white/35" : "stroke-[#94a3b8]"}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="20"
        r="5.5"
        className={onDark ? "fill-[#2563eb]/25 stroke-[#60a5fa]" : "fill-[#2563eb]/15 stroke-[#2563eb]"}
        strokeWidth="1.25"
      />
      <path
        d="M20 12.5 24.5 22H15.5L20 12.5Z"
        className="fill-[#3b82f6]"
        opacity="0.95"
      />
      <circle cx="20" cy="19" r="1.1" className="fill-white" />
    </svg>
  );
}

export default function Logo({
  className = "",
  height = 32,
  onDark = false,
  href = "/",
}: LogoProps) {
  const markSize = Math.round(height * 1.05);
  const wordmarkSize = Math.round(height * 0.52);

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} onDark={onDark} />
      <span className="flex flex-col justify-center leading-none">
        <span
          className={cn(
            "font-semibold tracking-[-0.03em]",
            onDark ? "text-white" : "text-[#0b2d63]",
          )}
          style={{ fontSize: wordmarkSize }}
        >
          Drone
          <span className={onDark ? "text-[#60a5fa]" : "text-[#2563eb]"}>Catalyst</span>
        </span>
        <span
          className={cn(
            "mt-1 font-medium uppercase tracking-[0.22em]",
            onDark ? "text-white/40" : "text-[#64748b]",
          )}
          style={{ fontSize: Math.max(8, Math.round(wordmarkSize * 0.34)) }}
        >
          Aerial Intelligence
        </span>
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={SITE_NAME}>
      {content}
    </Link>
  );
}
