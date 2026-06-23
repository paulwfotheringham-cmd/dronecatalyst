"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  createInitialAssetRegistry,
  type ManagedAsset,
} from "@/lib/asset-management-data";
import {
  createInitialClients,
  type ManagedClient,
} from "@/lib/client-management-data";
import { createInitialMissions, type ManagedMission } from "@/lib/mission-management-data";
import {
  INTERNAL_OPERATIONS_BASE_PATH,
  isInternalOperationsView,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import AssetManagementWorkspace from "./AssetManagementWorkspace";
import ClientManagementWorkspace from "./ClientManagementWorkspace";
import CalendarWorkspace from "./CalendarWorkspace";
import CompetitorsWorkspace from "./CompetitorsWorkspace";
import CrmWorkspace from "./CrmWorkspace";
import FileRepositoryReferenceImages from "./FileRepositoryReferenceImages";
import FileRepositoryWorkspace from "./FileRepositoryWorkspace";
import FleetWorkspace from "./FleetWorkspace";
import InternalDashboardHome from "./InternalDashboardHome";
import LiveProjectsPanel from "./LiveProjectsPanel";
import MediaExampleWorkspace from "./MediaExampleWorkspace";
import MessagingWorkspace from "./MessagingWorkspace";
import RecentMissionsPanel from "./RecentMissionsPanel";
import StrategyWorkspace from "./StrategyWorkspace";
import WhiteboardWorkspace from "./WhiteboardWorkspace";
import SurveyOperationsShell from "./SurveyOperationsShell";
import UserManagementWorkspace from "./UserManagementWorkspace";
import WebODMWorkspace from "./WebODMWorkspace";
import TelemetryDashboard from "@/components/telemetry/TelemetryDashboard";
import { createInitialUsers, type ManagedUser } from "@/lib/user-management-data";
import { useSurveyOperationsSimulator } from "./SurveyOperationsSimulatorProvider";

function readInitialView(searchParams: ReturnType<typeof useSearchParams>): InternalOperationsView {
  const viewParam = searchParams.get("view");
  return isInternalOperationsView(viewParam) ? viewParam : "home";
}

export default function InternalOperationsDashboard() {
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState<InternalOperationsView>(() =>
    readInitialView(searchParams),
  );
  const { liveTelemetry, isRunning, setSandboxMountTarget, setExcludedProfileIds } =
    useSurveyOperationsSimulator();
  const [missions] = useState<ManagedMission[]>(() => createInitialMissions());
  const [assetRegistry] = useState(() => createInitialAssetRegistry());
  const [assets, setAssets] = useState<ManagedAsset[]>(() => assetRegistry.assets);
  const [assetCategories, setAssetCategories] = useState<string[]>(() => assetRegistry.categories);
  const [assetLocations, setAssetLocations] = useState<string[]>(() => assetRegistry.locations);
  const [clients, setClients] = useState<ManagedClient[]>(() => createInitialClients());
  const [selectedAssetId, setSelectedAssetId] = useState("asset-1");
  const [selectedClientId, setSelectedClientId] = useState("client-1");
  const [users, setUsers] = useState<ManagedUser[]>(() => createInitialUsers());
  const [selectedUserId, setSelectedUserId] = useState("user-1");
  const testingSandboxHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (isInternalOperationsView(viewParam)) {
      setActiveView(viewParam);
    } else if (!viewParam) {
      setActiveView("home");
    }
  }, [searchParams]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeView === "home") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", activeView);
    }
    window.history.replaceState({}, "", url.toString());
  }, [activeView]);

  useLayoutEffect(() => {
    const host = activeView === "testing" ? testingSandboxHostRef.current : null;
    setSandboxMountTarget(host);

    return () => setSandboxMountTarget(null);
  }, [activeView, setSandboxMountTarget]);

  useEffect(() => {
    if (activeView === "testing") {
      setExcludedProfileIds(["france", "austin"]);
      return;
    }

    setExcludedProfileIds([]);
  }, [activeView, setExcludedProfileIds]);

  const handleViewChange = useCallback((view: InternalOperationsView) => {
    setActiveView(view);
  }, []);

  return (
    <SurveyOperationsShell
      mode="internal"
      activeView={activeView}
      onViewChange={(view) => {
        if (isInternalOperationsView(view)) {
          handleViewChange(view);
        }
      }}
      basePath={INTERNAL_OPERATIONS_BASE_PATH}
    >
      <div
        className={
          activeView === "home"
            ? "relative px-4 py-3 sm:px-5 lg:px-6 lg:py-4"
            : "relative px-4 py-3 sm:px-6 lg:px-8 lg:py-4"
        }
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.12), transparent 70%)",
          }}
        />

        <div className="relative space-y-6">
          {activeView === "home" && (
            <div className="2xl:flex 2xl:h-[calc(100dvh-4rem-1.5rem)] 2xl:max-h-[calc(100dvh-4rem-1.5rem)] 2xl:min-h-0 2xl:flex-col 2xl:overflow-hidden">
              <InternalDashboardHome onNavigate={handleViewChange} />
            </div>
          )}

          {activeView === "clients" && (
            <ClientManagementWorkspace
              clients={clients}
              selectedClientId={selectedClientId}
              onSelectClient={setSelectedClientId}
              onClientsChange={setClients}
            />
          )}

          {activeView === "assets" && (
            <AssetManagementWorkspace
              assets={assets}
              categories={assetCategories}
              locations={assetLocations}
              clients={clients}
              users={users}
              selectedAssetId={selectedAssetId}
              onSelectAsset={setSelectedAssetId}
              onAssetsChange={setAssets}
              onCategoriesChange={setAssetCategories}
              onLocationsChange={setAssetLocations}
            />
          )}

          {activeView === "fleet" && (
            <FleetWorkspace
              liveTelemetry={liveTelemetry}
              isRunning={isRunning}
              onOpenAssets={() => handleViewChange("assets")}
              users={users}
            />
          )}

          {activeView === "testing" && <div ref={testingSandboxHostRef} className="space-y-6" />}

          {activeView === "live-projects" && <LiveProjectsPanel missions={missions} />}

          {activeView === "recent-missions" && <RecentMissionsPanel />}

          {activeView === "webodm" && <WebODMWorkspace />}

          {activeView === "crm" && <CrmWorkspace />}

          {activeView === "strategy" && <StrategyWorkspace />}

          {activeView === "whiteboard" && <WhiteboardWorkspace />}

          {activeView === "competitors" && <CompetitorsWorkspace />}

          {activeView === "messaging" && <MessagingWorkspace />}

          {activeView === "calendar" && <CalendarWorkspace />}

          {activeView === "files" && (
            <div className="space-y-6">
              <FileRepositoryWorkspace />
              <FileRepositoryReferenceImages />
            </div>
          )}

          {activeView === "users" && (
            <UserManagementWorkspace
              users={users}
              selectedUserId={selectedUserId}
              onSelectUser={setSelectedUserId}
              onUsersChange={setUsers}
            />
          )}

          {activeView === "telemetry" && <TelemetryDashboard />}

          {activeView === "media-example" && <MediaExampleWorkspace />}
        </div>
      </div>
    </SurveyOperationsShell>
  );
}
