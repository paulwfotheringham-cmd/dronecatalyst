"use client";

import { useEffect, useRef } from "react";

import type { Telemetry } from "@/lib/telemetry";

type SimulatedLiveVideoViewProps = {
  telemetry: Telemetry;
};

function formatHudTime(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function SimulatedLiveVideoView({ telemetry }: SimulatedLiveVideoViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const telemetryRef = useRef(telemetry);

  useEffect(() => {
    telemetryRef.current = telemetry;
  }, [telemetry]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frameId = 0;
    let offset = 0;
    let grainSeed = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const current = telemetryRef.current;
      const speedFactor = current.speedMph / 30;
      const altFactor = (current.altitudeFt - 120) / 280;

      offset += 0.6 + speedFactor * 1.4;
      grainSeed += 1;

      const horizonY = height * (0.38 - altFactor * 0.08);

      const sky = context.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, "#0c1f3f");
      sky.addColorStop(0.55, "#1e4976");
      sky.addColorStop(1, "#3d6f8f");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, horizonY);

      const ground = context.createLinearGradient(0, horizonY, 0, height);
      ground.addColorStop(0, "#2f5233");
      ground.addColorStop(0.35, "#3f6b3f");
      ground.addColorStop(1, "#1f3420");
      context.fillStyle = ground;
      context.fillRect(0, horizonY, width, height - horizonY);

      context.strokeStyle = "rgba(255,255,255,0.08)";
      context.lineWidth = 1;
      for (let index = 0; index < 8; index += 1) {
        const laneOffset = ((offset + index * 90) % 720) / 720;
        const spread = 0.12 + laneOffset * 0.78;
        const topX = width * (0.5 + (spread - 0.5) * 0.08);
        const bottomX = width * spread;

        context.beginPath();
        context.moveTo(topX, horizonY);
        context.lineTo(bottomX, height);
        context.stroke();
      }

      context.strokeStyle = "rgba(120, 180, 120, 0.18)";
      for (let row = 0; row < 6; row += 1) {
        const rowOffset = ((offset * 1.6 + row * 48) % 288) / 288;
        const y = horizonY + rowOffset * (height - horizonY);

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const driftX = Math.sin(grainSeed * 0.015) * 2;
      const driftY = Math.cos(grainSeed * 0.011) * 1.5;
      context.strokeStyle = "rgba(255,255,255,0.55)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(width / 2 - 18 + driftX, height / 2 + driftY);
      context.lineTo(width / 2 - 6 + driftX, height / 2 + driftY);
      context.moveTo(width / 2 + 6 + driftX, height / 2 + driftY);
      context.lineTo(width / 2 + 18 + driftX, height / 2 + driftY);
      context.moveTo(width / 2 + driftX, height / 2 - 18 + driftY);
      context.lineTo(width / 2 + driftX, height / 2 - 6 + driftY);
      context.moveTo(width / 2 + driftX, height / 2 + 6 + driftY);
      context.lineTo(width / 2 + driftX, height / 2 + 18 + driftY);
      context.stroke();

      context.fillStyle = "rgba(255,255,255,0.03)";
      for (let index = 0; index < 120; index += 1) {
        const x = ((index * 97 + grainSeed * 13) % width) | 0;
        const y = ((index * 53 + grainSeed * 7) % height) | 0;
        context.fillRect(x, y, 1, 1);
      }

      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.2,
        width / 2,
        height / 2,
        height * 0.75,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      frameId = window.requestAnimationFrame(draw);
    };

    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 sm:px-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            FPV Camera
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Live Video Feed</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-red-300">
            <span className="live-video-rec h-2 w-2 rounded-full bg-red-400" />
            Rec
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
            <span className="live-video-pulse h-2 w-2 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
      </div>

      <div className="relative aspect-video w-full bg-[#020617]">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="Simulated live drone video feed" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_3px] opacity-30" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/15 bg-black/45 px-3 py-2 font-mono text-[11px] text-white/85 backdrop-blur-sm">
          <p>{telemetry.droneId}</p>
          <p className="mt-1 text-white/60">{formatHudTime(telemetry.lastUpdated)} UTC</p>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/15 bg-black/45 px-3 py-2 text-right font-mono text-[11px] text-white/85 backdrop-blur-sm">
          <p>ALT {telemetry.altitudeFt.toFixed(0)} FT</p>
          <p className="mt-1">SPD {telemetry.speedMph.toFixed(1)} MPH</p>
          <p className="mt-1 text-emerald-300">BAT {telemetry.batteryPct.toFixed(1)}%</p>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/45 px-3 py-2 font-mono text-[11px] text-white/75 backdrop-blur-sm">
          <p>
            {telemetry.latitude.toFixed(6)}, {telemetry.longitude.toFixed(6)}
          </p>
          <p className="mt-1 text-white/50">Simulated FPV · Matrice 4T</p>
        </div>
      </div>
    </section>
  );
}
