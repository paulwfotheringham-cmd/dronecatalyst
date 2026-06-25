"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { MineOperator } from "@/lib/mining-sector-data";

import MapTileLayers from "./MapTileLayers";

type LatLng = [number, number];

function rankIcon(rank: number) {
  const hue = rank <= 3 ? 38 : 210;
  const saturation = rank <= 3 ? 92 : 78;
  const size = rank <= 3 ? 18 : 14;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:hsl(${hue},${saturation}%,48%);border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 10px hsla(${hue},${saturation}%,48%,0.85);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;">${rank}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapBoundsSync({ operators }: { operators: MineOperator[] }) {
  const map = useMap();

  useEffect(() => {
    if (operators.length === 0) return;

    const bounds = L.latLngBounds(
      operators.map((operator) => [operator.latitude, operator.longitude] as LatLng),
    );
    map.fitBounds(bounds.pad(0.18), { animate: true, maxZoom: 10 });
  }, [map, operators]);

  return null;
}

function OperatorMarkers({ operators }: { operators: MineOperator[] }) {
  const map = useMap();
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    layerRef.current?.remove();
    const group = L.layerGroup();

    operators.forEach((operator) => {
      const marker = L.marker([operator.latitude, operator.longitude], {
        icon: rankIcon(operator.rank),
      });
      marker.bindPopup(
        `<strong>${operator.companyName}</strong><br/>${operator.siteLabel}<br/><span style="opacity:0.75">${operator.primaryCommodity}</span>`,
      );
      group.addLayer(marker);
    });

    group.addTo(map);
    layerRef.current = group;

    return () => {
      group.remove();
      layerRef.current = null;
    };
  }, [map, operators]);

  return null;
}

type MiningOperatorsMapProps = {
  operators: MineOperator[];
  center: LatLng;
  zoom: number;
};

export default function MiningOperatorsMap({ operators, center, zoom }: MiningOperatorsMapProps) {
  return (
    <div className="flight-path-map-shell flight-path-map-shell--satellite-texture relative overflow-hidden rounded-xl border border-white/10">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-[min(48vh,420px)] w-full"
        style={{ background: "#2f3d2c" }}
      >
        <MapTileLayers style="satellite" flightPathMode />
        <MapBoundsSync operators={operators} />
        <OperatorMarkers operators={operators} />
      </MapContainer>
    </div>
  );
}
