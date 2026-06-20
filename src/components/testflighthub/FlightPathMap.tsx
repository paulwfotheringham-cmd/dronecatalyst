"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

const droneIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#2563eb;border:2px solid #e0f2fe;box-shadow:0 0 12px rgba(37,99,235,0.9);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapViewSync({ position }: { position: LatLng }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [map, position]);

  return null;
}

type FlightPathMapProps = {
  position: LatLng;
  path: LatLng[];
};

export default function FlightPathMap({ position, path }: FlightPathMapProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
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
        <MapViewSync position={position} />
        {path.length > 1 && (
          <Polyline
            positions={path}
            pathOptions={{ color: "#3b82f6", weight: 3, opacity: 0.85 }}
          />
        )}
        <Marker position={position} icon={droneIcon} />
      </MapContainer>
    </div>
  );
}
