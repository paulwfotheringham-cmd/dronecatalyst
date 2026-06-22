import CrmWorkspace from "@/components/testflighthub/CrmWorkspace";
import SurveyOperationsShell from "@/components/testflighthub/SurveyOperationsShell";

export default function CrmPage() {
  return (
    <SurveyOperationsShell mode="internal" title="CRM" subtitle="Internal Operations">
      <div className="relative px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.12), transparent 70%)",
          }}
        />

        <div className="relative">
          <CrmWorkspace />
        </div>
      </div>
    </SurveyOperationsShell>
  );
}
