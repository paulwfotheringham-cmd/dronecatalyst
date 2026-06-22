"use client";

import { useState } from "react";

import SurveyOperationsShell from "@/components/testflighthub/SurveyOperationsShell";
import UserManagementWorkspace from "@/components/testflighthub/UserManagementWorkspace";
import { createInitialUsers, type ManagedUser } from "@/lib/user-management-data";

export default function UsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>(() => createInitialUsers());
  const [selectedUserId, setSelectedUserId] = useState("user-1");

  return (
    <SurveyOperationsShell mode="internal" title="Users" subtitle="Internal Operations">
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
          <UserManagementWorkspace
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
            onUsersChange={setUsers}
          />
        </div>
      </div>
    </SurveyOperationsShell>
  );
}
