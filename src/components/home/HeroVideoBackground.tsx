"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO = "/videos/drone.mp4";
const HERO_IMAGE = "/images/hero/drone-quarry-scan.webp";

export default function HeroVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {prefersReducedMotion ? (
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-[48%_24%]"
          sizes="100vw"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: "100%", height: "100%" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
