import DashboardShell from "@/components/dashboard/DashboardShell";
import ClientMessagingWorkspace from "@/components/messaging/ClientMessagingWorkspace";

export default function WestportMessagesPage() {
  return (
    <DashboardShell>
      <div className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4 lg:p-6">
        <ClientMessagingWorkspace />
      </div>
    </DashboardShell>
  );
}
