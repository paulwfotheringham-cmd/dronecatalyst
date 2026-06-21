"use client";

import { useEffect } from "react";

type DroneTakeoffOverlayProps = {
  active: boolean;
  onComplete?: () => void;
};

function DroneSvg() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="drop-shadow-[0_8px_24px_rgba(37,99,235,0.45)]"
    >
      <circle cx="28" cy="28" r="6" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.5" />
      <path
        d="M28 22V14M28 42V34M22 28H14M42 28H34"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="42" cy="14" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="14" cy="42" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="42" cy="42" r="4.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <g className="drone-propeller">
        <ellipse cx="14" cy="14" rx="7" ry="1.5" fill="#bae6fd" opacity="0.55" />
      </g>
      <g className="drone-propeller drone-propeller-delay">
        <ellipse cx="42" cy="42" rx="7" ry="1.5" fill="#bae6fd" opacity="0.55" />
      </g>
      <path
        d="M28 34L24 40H32L28 34Z"
        fill="#2563eb"
        stroke="#93c5fd"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DroneTakeoffOverlay({ active, onComplete }: DroneTakeoffOverlayProps) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => onComplete?.(), 2800);
    return () => window.clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1000] overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/50 via-[#07111F]/10 to-transparent" />
      <div className="drone-takeoff-scene absolute bottom-[22%] left-1/2">
        <DroneSvg />
        <div className="drone-takeoff-trail mx-auto mt-1 h-10 w-px bg-gradient-to-t from-sky-400/50 to-transparent" />
      </div>
    </div>
  );
}
