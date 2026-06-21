"use client";

import { TileLayer } from "react-leaflet";

import {
  SATELLITE_MAP_ATTRIBUTION,
  type MapTerrainStyle,
  URBAN_MAP_ATTRIBUTION,
} from "@/lib/map-tiles";

type MapTileLayersProps = {
  style: MapTerrainStyle;
  showAttribution?: boolean;
  /** Photorealistic stack tuned for the FPV live video feed. */
  videoMode?: boolean;
};

export default function MapTileLayers({
  style,
  showAttribution = true,
  videoMode = false,
}: MapTileLayersProps) {
  if (videoMode) {
    return (
      <>
        <TileLayer
          attribution={showAttribution ? SATELLITE_MAP_ATTRIBUTION : undefined}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={20}
        />
        {style === "urban" ? (
          <TileLayer
            attribution={showAttribution ? URBAN_MAP_ATTRIBUTION : undefined}
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={20}
            opacity={0.42}
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
            opacity={0.28}
          />
        )}
      </>
    );
  }

  if (style === "urban") {
    return (
      <>
        <TileLayer
          attribution={showAttribution ? URBAN_MAP_ATTRIBUTION : undefined}
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          opacity={0.18}
        />
      </>
    );
  }

  return (
    <>
      <TileLayer
        attribution={showAttribution ? SATELLITE_MAP_ATTRIBUTION : undefined}
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
      />
      <TileLayer
        attribution={
          showAttribution
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            : undefined
        }
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={17}
        opacity={0.42}
      />
    </>
  );
}
