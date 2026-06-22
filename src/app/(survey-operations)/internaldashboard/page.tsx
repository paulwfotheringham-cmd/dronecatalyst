import { Suspense } from "react";

import SurveyOperationsDashboard from "@/components/testflighthub/SurveyOperationsDashboard";

export default function InternalDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-[50vh] items-center justify-center bg-[#020617] text-sm text-white/50">
          Loading internal operations workspace...
        </div>
      }
    >
      <SurveyOperationsDashboard basePath="/internaldashboard" />
    </Suspense>
  );
}
