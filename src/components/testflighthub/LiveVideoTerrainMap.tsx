"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { type MapTerrainStyle } from "@/lib/map-tiles";
import type { Telemetry } from "@/lib/telemetry";

import MapTileLayers from "./MapTileLayers";

type LatLng = [number, number];

type LiveVideoTerrainMapProps = {
  telemetry: Telemetry;
  terrainStyle?: MapTerrainStyle;
};

type CameraMotion = {
  heading: number;
  bank: number;
  shakeX: number;
  shakeY: number;
};

function zoomForAltitude(altitudeFt: number) {
  if (altitudeFt >= 360) return 18;
  if (altitudeFt >= 280) return 19;
  return 20;
}

function bearingDegrees(from: LatLng, to: LatLng) {
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const deltaLng = ((to[1] - from[1]) * Math.PI) / 180;
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function movePoint(lat: number, lng: number, bearingDeg: number, distanceMeters: number): LatLng {
  const earthRadius = 6378137;
  const bearing = (bearingDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const angular = distanceMeters / earthRadius;
  const nextLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(angular) +
      Math.cos(latRad) * Math.sin(angular) * Math.cos(bearing),
  );
  const nextLngRad =
    lngRad +
    Math.atan2(
      Math.sin(bearing) * Math.sin(angular) * Math.cos(latRad),
      Math.cos(angular) - Math.sin(latRad) * Math.sin(nextLatRad),
    );

  return [(nextLatRad * 180) / Math.PI, (nextLngRad * 180) / Math.PI];
}

function mphToMps(speedMph: number) {
  return speedMph * 0.44704;
}

function applyCameraTransform(stage: HTMLDivElement, motion: CameraMotion, scale: number) {
  stage.style.transform = [
    `rotateX(52deg)`,
    `rotateZ(${(-motion.heading + motion.bank).toFixed(2)}deg)`,
    `scale(${scale.toFixed(3)})`,
    `translate3d(${motion.shakeX.toFixed(2)}px, ${(motion.shakeY - 6).toFixed(2)}px, 0)`,
  ].join(" ");
}

function ChaseCamera({
  telemetry,
  terrainStyle,
  stageRef,
}: {
  telemetry: Telemetry;
  terrainStyle: MapTerrainStyle;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const map = useMap();
  const telemetryRef = useRef(telemetry);
  const displayPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const targetPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const headingRef = useRef(0);
  const lastHeadingRef = useRef(0);
  const lastTelemetryPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const initializedRef = useRef(false);
  const motionRef = useRef<CameraMotion>({
    heading: 0,
    bank: 0,
    shakeX: 0,
    shakeY: 0,
  });

  useEffect(() => {
    telemetryRef.current = telemetry;

    const nextTarget: LatLng = [telemetry.latitude, telemetry.longitude];
    const previousTarget = targetPositionRef.current;

    if (previousTarget[0] !== nextTarget[0] || previousTarget[1] !== nextTarget[1]) {
      headingRef.current = bearingDegrees(lastTelemetryPositionRef.current, nextTarget);
      lastTelemetryPositionRef.current = nextTarget;
    }

    targetPositionRef.current = nextTarget;

    if (!initializedRef.current) {
      displayPositionRef.current = nextTarget;
      initializedRef.current = true;
      map.setView(nextTarget, zoomForAltitude(telemetry.altitudeFt), { animate: false });
    }
  }, [map, telemetry]);

  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    if (map.zoomControl) {
      map.removeControl(map.zoomControl);
    }

    let frameId = 0;
    let lastTimestamp = performance.now();
    const scale = terrainStyle === "urban" ? 1.78 : 1.72;

    const tick = (timestamp: number) => {
      const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      const current = telemetryRef.current;
      const target = targetPositionRef.current;
      const display = displayPositionRef.current;
      const heading = headingRef.current;
      const speedMps = mphToMps(current.speedMph);
      const headingDelta = Math.abs(heading - lastHeadingRef.current);
      lastHeadingRef.current = heading;

      const forwardStep = movePoint(display[0], display[1], heading, speedMps * deltaSeconds);
      const towardTarget: LatLng = [
        display[0] + (target[0] - display[0]) * Math.min(deltaSeconds * 2.2, 0.4),
        display[1] + (target[1] - display[1]) * Math.min(deltaSeconds * 2.2, 0.4),
      ];

      displayPositionRef.current = [
        forwardStep[0] * 0.78 + towardTarget[0] * 0.22,
        forwardStep[1] * 0.78 + towardTarget[1] * 0.22,
      ];

      const shakeIntensity = 0.12 + speedMps * 0.018 + headingDelta * 2.5;
      motionRef.current = {
        heading,
        bank: Math.sin(timestamp * 0.0018) * 1.4 + headingDelta * 12,
        shakeX: Math.sin(timestamp * 0.011) * shakeIntensity,
        shakeY: Math.cos(timestamp * 0.009) * shakeIntensity * 0.7,
      };

      if (stageRef.current) {
        applyCameraTransform(stageRef.current, motionRef.current, scale);
      }

      map.setView(displayPositionRef.current, zoomForAltitude(current.altitudeFt), { animate: false });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [map, stageRef, terrainStyle]);

  return null;
}

export default function LiveVideoTerrainMap({
  telemetry,
  terrainStyle = "satellite",
}: LiveVideoTerrainMapProps) {
  const initialPosition: LatLng = [telemetry.latitude, telemetry.longitude];
  const stageRef = useRef<HTMLDivElement>(null);
  const shellClassName =
    terrainStyle === "urban"
      ? "live-video-map-shell live-video-map-shell--urban"
      : "live-video-map-shell";

  return (
    <div className={`${shellClassName} absolute inset-0 overflow-hidden`}>
      <div className="live-video-camera-rig absolute inset-0">
        <div ref={stageRef} className="live-video-map-stage absolute inset-0">
          <MapContainer
            center={initialPosition}
            zoom={zoomForAltitude(telemetry.altitudeFt)}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            className="h-full w-full"
            style={{ background: "#1a2418" }}
          >
            <MapTileLayers style={terrainStyle} showAttribution={false} videoMode />
            <ChaseCamera telemetry={telemetry} terrainStyle={terrainStyle} stageRef={stageRef} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
