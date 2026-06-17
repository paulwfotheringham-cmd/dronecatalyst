import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RECENT_REPORTS } from "@/lib/mock-data";
import { Download, FileText } from "lucide-react";

export default function ReportsList() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-white/50" />
          Recent Reports
        </CardTitle>
        <CardDescription>Latest project intelligence deliverables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0 pt-0">
        {RECENT_REPORTS.map((report, i) => (
          <div key={report.title}>
            <div className="flex items-center gap-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#07111F]">
                <FileText className="h-4 w-4 text-white/40" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white/85">{report.title}</p>
                <p className="mt-1 text-xs text-white/40">
                  {report.type} · {report.date}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 rounded-2xl">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            {i < RECENT_REPORTS.length - 1 && (
              <Separator className="bg-white/[0.06]" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
