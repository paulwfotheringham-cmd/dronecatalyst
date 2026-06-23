"use client";

import { useMemo } from "react";

import {
  USER_REGION_OPTIONS,
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
  userStatusClass,
  type ManagedUser,
} from "@/lib/user-management-data";
import { cn } from "@/lib/utils";
import ResponsiveMasterDetail, { useMobileDetailPanel } from "@/components/ui/ResponsiveMasterDetail";

type UserManagementWorkspaceProps = {
  users: ManagedUser[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  onUsersChange: (users: ManagedUser[]) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
      {children}
    </label>
  );
}

function inputClassName() {
  return "mt-1.5 w-full rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-sky-400/50";
}

export default function UserManagementWorkspace({
  users,
  selectedUserId,
  onSelectUser,
  onUsersChange,
}: UserManagementWorkspaceProps) {
  const { showDetail, openDetail, closeDetail } = useMobileDetailPanel();
  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? users[0],
    [users, selectedUserId],
  );

  function updateUser(updated: ManagedUser) {
    onUsersChange(users.map((user) => (user.id === updated.id ? updated : user)));
  }

  function patchSelected(patch: Partial<ManagedUser>) {
    if (!selectedUser) return;
    updateUser({ ...selectedUser, ...patch });
  }

  return (
    <div className="space-y-6">
      <ResponsiveMasterDetail
        showDetail={showDetail && !!selectedUser}
        onBack={closeDetail}
        backLabel="Back to operators"
        master={
        <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Operators</h2>
            <p className="mt-1 text-xs text-white/45">{users.length} active accounts</p>
          </div>

          <ul className="mt-4 space-y-2">
            {users.map((user) => {
              const selected = user.id === selectedUser?.id;

              return (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectUser(user.id);
                      openDetail();
                    }}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-sky-400/40 bg-sky-500/10 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/80">
                          {user.operatorLabel}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">{user.fullName}</p>
                        <p className="mt-1 font-mono text-xs text-white/45">@{user.username}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]",
                          userStatusClass(user.status),
                        )}
                      >
                        {user.status}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        }
        detail={
        selectedUser ? (
          <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                  {selectedUser.operatorLabel}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">{selectedUser.fullName}</h2>
                <p className="mt-1 font-mono text-sm text-white/50">@{selectedUser.username}</p>
              </div>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                  userStatusClass(selectedUser.status),
                )}
              >
                {selectedUser.status}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedUser.fullName}
                  onChange={(event) => patchSelected({ fullName: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Username</FieldLabel>
                <input
                  className={cn(inputClassName(), "font-mono")}
                  value={selectedUser.username}
                  onChange={(event) => patchSelected({ username: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  className={inputClassName()}
                  value={selectedUser.email}
                  onChange={(event) => patchSelected({ email: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedUser.phone}
                  onChange={(event) => patchSelected({ phone: event.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Role</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedUser.role}
                  onChange={(event) =>
                    patchSelected({ role: event.target.value as ManagedUser["role"] })
                  }
                >
                  {USER_ROLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Region</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedUser.region}
                  onChange={(event) =>
                    patchSelected({ region: event.target.value as ManagedUser["region"] })
                  }
                >
                  {USER_REGION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Status</FieldLabel>
                <select
                  className={inputClassName()}
                  value={selectedUser.status}
                  onChange={(event) =>
                    patchSelected({ status: event.target.value as ManagedUser["status"] })
                  }
                >
                  {USER_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>License / Certification</FieldLabel>
                <input
                  className={inputClassName()}
                  value={selectedUser.licenseId}
                  onChange={(event) => patchSelected({ licenseId: event.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Notes</FieldLabel>
                <textarea
                  rows={3}
                  className={cn(inputClassName(), "resize-y")}
                  value={selectedUser.notes}
                  onChange={(event) => patchSelected({ notes: event.target.value })}
                />
              </div>
            </div>
          </section>
        ) : null
        }
      />
    </div>
  );
}
