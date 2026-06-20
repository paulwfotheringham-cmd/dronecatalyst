"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

const currentIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#2563eb;border:2px solid #e0f2fe;box-shadow:0 0 14px rgba(37,99,235,0.95);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const startIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#10b981;border:2px solid #d1fae5;box-shadow:0 0 12px rgba(16,185,129,0.9);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapViewSync({ position, path }: { position: LatLng; path: LatLng[] }) {
  const map = useMap();

  useEffect(() => {
    if (path.length >= 2) {
      map.fitBounds(L.latLngBounds(path), { padding: [36, 36], maxZoom: 17, animate: true });
      return;
    }

    map.setView(position, map.getZoom() || 16, { animate: true });
  }, [map, path, position]);

  return null;
}

function FlightPathPolyline({ path }: { path: LatLng[] }) {
  const map = useMap();
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!polylineRef.current) {
      polylineRef.current = L.polyline([], {
        color: "#3b82f6",
        weight: 4,
        opacity: 0.9,
      }).addTo(map);
    }

    polylineRef.current.setLatLngs(path.length >= 2 ? path : []);
  }, [map, path]);

  useEffect(() => {
    return () => {
      polylineRef.current?.remove();
      polylineRef.current = null;
    };
  }, [map]);

  return null;
}

function UpdatingMarker({ position, icon }: { position: LatLng; icon: L.DivIcon }) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = L.marker(position, { icon }).addTo(map);
      return;
    }

    markerRef.current.setLatLng(position);
  }, [map, position, icon]);

  useEffect(() => {
    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
    };
  }, [map]);

  return null;
}

export type FlightPathMapProps = {
  position: LatLng;
  path: LatLng[];
  pathPointCount?: number;
  currentLatitude?: number;
  currentLongitude?: number;
};

export default function FlightPathMap({
  position,
  path,
  pathPointCount,
  currentLatitude,
  currentLongitude,
}: FlightPathMapProps) {
  const startPosition = path[0] ?? position;
  const pointCount = pathPointCount ?? path.length;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
        <p className="text-white/60">
          Total path points:{" "}
          <span className="font-mono font-semibold text-white">{pointCount}</span>
        </p>
        <p className="font-mono text-white/70">
          Current:{" "}
          {(currentLatitude ?? position[0]).toFixed(6)},{" "}
          {(currentLongitude ?? position[1]).toFixed(6)}
        </p>
      </div>

      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        className="h-[320px] w-full"
        style={{ background: "#0f172a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapViewSync position={position} path={path} />
        <FlightPathPolyline path={path} />
        <UpdatingMarker position={startPosition} icon={startIcon} />
        <UpdatingMarker position={position} icon={currentIcon} />
      </MapContainer>
    </div>
  );
}
