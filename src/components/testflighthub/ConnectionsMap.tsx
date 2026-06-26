"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { CrmConnection } from "@/lib/connections-data";

import MapTileLayers from "./MapTileLayers";

type LatLng = [number, number];

function personIcon(active: boolean) {
  const bg = active ? "#38bdf8" : "#2563eb";
  const ring = active ? "0 0 0 3px rgba(56,189,248,0.45)" : "0 2px 8px rgba(0,0,0,0.35)";
  return L.divIcon({
    className: "",
    html: `<div style="width:30px;height:30px;border-radius:9999px;background:${bg};border:2px solid rgba(255,255,255,0.95);box-shadow:${ring};display:flex;align-items:center;justify-content:center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function popupHtml(connection: CrmConnection) {
  return `
    <div style="min-width:180px;font-family:system-ui,sans-serif;line-height:1.45">
      <strong style="font-size:13px">${connection.name}</strong><br/>
      <span style="opacity:0.75;font-size:12px">${connection.role}</span><br/>
      <span style="opacity:0.65;font-size:11px">${connection.city}, ${connection.country}</span>
      ${connection.specialties ? `<br/><span style="opacity:0.8;font-size:11px;margin-top:4px;display:inline-block">${connection.specialties}</span>` : ""}
    </div>
  `;
}

function MapBoundsSync({ connections }: { connections: CrmConnection[] }) {
  const map = useMap();

  useEffect(() => {
    if (connections.length === 0) return;
    const bounds = L.latLngBounds(
      connections.map((entry) => [entry.latitude, entry.longitude] as LatLng),
    );
    map.fitBounds(bounds.pad(0.15), { animate: true, maxZoom: 4 });
  }, [map, connections]);

  return null;
}

function ConnectionMarkers({
  connections,
  selectedId,
  onSelect,
}: {
  connections: CrmConnection[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const map = useMap();
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    layerRef.current?.remove();
    const group = L.layerGroup();

    connections.forEach((connection) => {
      const active = connection.id === selectedId;
      const marker = L.marker([connection.latitude, connection.longitude], {
        icon: personIcon(active),
      });

      marker.bindPopup(popupHtml(connection), { maxWidth: 260 });
      marker.bindTooltip(connection.name, {
        direction: "top",
        offset: [0, -12],
        opacity: 0.95,
      });

      marker.on("click", () => onSelect(connection.id));
      group.addLayer(marker);
    });

    group.addTo(map);
    layerRef.current = group;

    return () => {
      group.remove();
      layerRef.current = null;
    };
  }, [map, connections, selectedId, onSelect]);

  return null;
}

type ConnectionsMapProps = {
  connections: CrmConnection[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function ConnectionsMap({ connections, selectedId, onSelect }: ConnectionsMapProps) {
  return (
    <div className="flight-path-map-shell flight-path-map-shell--satellite-texture relative overflow-hidden rounded-xl border border-white/10">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom
        className="h-[min(52vh,480px)] w-full"
        style={{ background: "#1a2332" }}
      >
        <MapTileLayers style="satellite" flightPathMode />
        <MapBoundsSync connections={connections} />
        <ConnectionMarkers
          connections={connections}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </MapContainer>
    </div>
  );
}
