"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import DroneTakeoffOverlay from "./DroneTakeoffOverlay";

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
      const bounds = L.latLngBounds(path);
      const center = bounds.getCenter();
      const span = Math.max(
        bounds.getNorthEast().lat - bounds.getSouthWest().lat,
        bounds.getNorthEast().lng - bounds.getSouthWest().lng,
      );

      const zoom = span < 0.002 ? 18 : span < 0.01 ? 17 : 16;
      map.setView(center, zoom, { animate: true });
      return;
    }

    map.setView(position, 18, { animate: true });
  }, [map, path, position]);

  return null;
}

function FlightPathPolyline({ path }: { path: LatLng[] }) {
  const map = useMap();
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!polylineRef.current) {
      polylineRef.current = L.polyline([], {
        color: "#38bdf8",
        weight: 5,
        opacity: 1,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    }

    const latLngs = path.length >= 2 ? path : [];
    polylineRef.current.setLatLngs(latLngs);
    polylineRef.current.bringToFront();
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
  takeoffActive?: boolean;
  onTakeoffComplete?: () => void;
};

export default function FlightPathMap({
  position,
  path,
  takeoffActive = false,
  onTakeoffComplete,
}: FlightPathMapProps) {
  const startPosition = path[0] ?? position;

  return (
    <div className="flight-path-map-shell relative overflow-hidden rounded-xl border border-white/10">
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={false}
        className="h-[320px] w-full"
        style={{ background: "#3d4f3a" }}
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, USGS, NOAA'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          maxZoom={17}
          opacity={0.42}
        />
        <MapViewSync position={position} path={path} />
        <FlightPathPolyline path={path} />
        <UpdatingMarker position={startPosition} icon={startIcon} />
        <UpdatingMarker position={position} icon={currentIcon} />
      </MapContainer>
      <DroneTakeoffOverlay active={takeoffActive} onComplete={onTakeoffComplete} />
    </div>
  );
}
