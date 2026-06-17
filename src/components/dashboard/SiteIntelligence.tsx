import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IMAGES, project, SITE_MARKERS } from "@/lib/mock-data";
import { CircleDot, Clock, Map } from "lucide-react";
import Image from "next/image";

export default function SiteIntelligence() {
  return (
    <Card>
      <CardHeader className="flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <div>
          <CardTitle className="text-lg">Site Intelligence</CardTitle>
          <CardDescription>
            Aerial orthomosaic — {project.name}
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="gap-1.5 rounded-2xl px-3 py-1">
            <Clock className="h-3 w-3" />
            Captured {project.captured}
          </Badge>
          <Badge variant="info" className="rounded-2xl">
            <CircleDot className="mr-1 h-3 w-3" />
            RTK Active
          </Badge>
          <Button variant="secondary" size="sm" className="rounded-2xl">
            <Map className="h-4 w-4" />
            Open Interactive Map
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07111F] sm:min-h-[440px] lg:min-h-[520px]">
          <Image
            src={IMAGES.siteIntelligence}
            alt={`Aerial intelligence view of ${project.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/90 via-[#07111F]/15 to-[#07111F]/25" />

          {SITE_MARKERS.map((marker) => (
            <div
              key={marker.id}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: marker.x, top: marker.y }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#0D1B2A]/95 font-mono text-sm font-semibold text-white shadow-xl ring-2 ring-blue-500/50 backdrop-blur-sm">
                  {marker.id}
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-[#0D1B2A]/95 px-3.5 py-2 shadow-xl backdrop-blur-md">
                  <p className="whitespace-nowrap text-xs font-medium text-white/90">
                    {marker.label}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 rounded-2xl border border-white/[0.08] bg-[#0D1B2A]/90 px-4 py-2.5 font-mono text-[11px] text-white/55 backdrop-blur-md">
            {project.coordinates}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
