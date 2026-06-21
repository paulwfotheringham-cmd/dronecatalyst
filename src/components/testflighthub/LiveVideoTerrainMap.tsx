"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { Telemetry } from "@/lib/telemetry";

type LatLng = [number, number];

type LiveVideoTerrainMapProps = {
  telemetry: Telemetry;
};

function zoomForAltitude(altitudeFt: number) {
  if (altitudeFt >= 360) return 17;
  if (altitudeFt >= 280) return 18;
  return 19;
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

function ChaseCamera({ telemetry }: { telemetry: Telemetry }) {
  const map = useMap();
  const telemetryRef = useRef(telemetry);
  const displayPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const targetPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const headingRef = useRef(45);
  const lastTelemetryPositionRef = useRef<LatLng>([telemetry.latitude, telemetry.longitude]);
  const initializedRef = useRef(false);

  useEffect(() => {
    telemetryRef.current = telemetry;

    const nextTarget: LatLng = [telemetry.latitude, telemetry.longitude];
    const previousTarget = targetPositionRef.current;

    if (
      previousTarget[0] !== nextTarget[0] ||
      previousTarget[1] !== nextTarget[1]
    ) {
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

    const tick = (timestamp: number) => {
      const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      const current = telemetryRef.current;
      const target = targetPositionRef.current;
      const display = displayPositionRef.current;
      const heading = headingRef.current;
      const speedMps = mphToMps(current.speedMph);

      const forwardStep = movePoint(display[0], display[1], heading, speedMps * deltaSeconds);
      const towardTarget: LatLng = [
        display[0] + (target[0] - display[0]) * Math.min(deltaSeconds * 1.8, 0.35),
        display[1] + (target[1] - display[1]) * Math.min(deltaSeconds * 1.8, 0.35),
      ];

      displayPositionRef.current = [
        forwardStep[0] * 0.72 + towardTarget[0] * 0.28,
        forwardStep[1] * 0.72 + towardTarget[1] * 0.28,
      ];

      const zoom = zoomForAltitude(current.altitudeFt);
      map.setView(displayPositionRef.current, zoom, { animate: false });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [map]);

  return null;
}

export default function LiveVideoTerrainMap({ telemetry }: LiveVideoTerrainMapProps) {
  const initialPosition: LatLng = [telemetry.latitude, telemetry.longitude];

  return (
    <div className="live-video-map-shell absolute inset-0 overflow-hidden">
      <div className="live-video-map-stage absolute inset-0">
        <MapContainer
          center={initialPosition}
          zoom={zoomForAltitude(telemetry.altitudeFt)}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
          style={{ background: "#2f3f2c" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
            opacity={0.5}
          />
          <ChaseCamera telemetry={telemetry} />
        </MapContainer>
      </div>
    </div>
  );
}
