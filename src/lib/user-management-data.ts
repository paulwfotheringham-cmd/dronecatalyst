export type UserRole =
  | "Senior Drone Operator"
  | "Drone Operator"
  | "Mission Coordinator"
  | "Survey Lead";

export type UserStatus = "Active" | "On Leave" | "Inactive";

export type UserRegion = "Barcelona" | "Porto" | "Oxford" | "Multi-site";

export type ManagedUser = {
  id: string;
  operatorLabel: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  region: UserRegion;
  licenseId: string;
  notes: string;
};

export const USER_ROLE_OPTIONS: UserRole[] = [
  "Senior Drone Operator",
  "Drone Operator",
  "Mission Coordinator",
  "Survey Lead",
];

export const USER_STATUS_OPTIONS: UserStatus[] = ["Active", "On Leave", "Inactive"];

export const USER_REGION_OPTIONS: UserRegion[] = ["Barcelona", "Porto", "Oxford", "Multi-site"];

/** Regional site owners — one operator per base location. */
export const REGION_OWNER_USER_IDS = {
  Barcelona: "user-1",
  Oxford: "user-2",
  Porto: "user-3",
} as const satisfies Record<"Barcelona" | "Porto" | "Oxford", string>;

export function getOwnerUserIdForRegion(region: string): string | null {
  if (region in REGION_OWNER_USER_IDS) {
    return REGION_OWNER_USER_IDS[region as keyof typeof REGION_OWNER_USER_IDS];
  }
  return null;
}

export function createInitialUsers(): ManagedUser[] {
  return [
    {
      id: "user-1",
      operatorLabel: "Operator 1",
      fullName: "Paul Fotheringham",
      username: "paul.fotheringham",
      email: "paul.fotheringham@dronecatalyst.com",
      phone: "+34 600 214 8801",
      role: "Senior Drone Operator",
      status: "Active",
      region: "Barcelona",
      licenseId: "EASA A2 · ES-DC-0142",
      notes: "Lead operator for Catalonia corridor and internal platform development.",
    },
    {
      id: "user-2",
      operatorLabel: "Operator 2",
      fullName: "Ashley Pursglove",
      username: "ashley.pursglove",
      email: "ashley.pursglove@dronecatalyst.com",
      phone: "+44 7700 900 482",
      role: "Survey Lead",
      status: "Active",
      region: "Oxford",
      licenseId: "CAA A2CofC · UK-DC-0097",
      notes: "Heritage and campus mapping programmes across Oxfordshire.",
    },
    {
      id: "user-3",
      operatorLabel: "Operator 3",
      fullName: "Daniel Houlton",
      username: "daniel.houlton",
      email: "daniel.houlton@dronecatalyst.com",
      phone: "+351 912 445 903",
      role: "Drone Operator",
      status: "Active",
      region: "Porto",
      licenseId: "ANAC A2 · PT-DC-0203",
      notes: "Port operations, berth surveys, and Douro logistics support.",
    },
  ];
}

export function userStatusClass(status: UserStatus) {
  switch (status) {
    case "Active":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
    case "On Leave":
      return "border-amber-400/40 bg-amber-500/15 text-amber-200";
    case "Inactive":
      return "border-white/20 bg-white/10 text-white/60";
  }
}
