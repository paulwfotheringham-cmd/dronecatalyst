export type AssetHomeBase = "Barcelona" | "Porto" | "Oxford";

export type AssetOperationalStatus =
  | "Standby"
  | "In Flight"
  | "In Hangar"
  | "Maintenance"
  | "Stopped";

export type DroneModel = "DJI Matrice 4T";

export type RtkCalibrationMode =
  | "Uncalibrated"
  | "Satellite Differential"
  | "Network RTK";

export type ControlSource = "RC" | "App" | "Cloud";

export type ManagedAsset = {
  id: string;
  assetTag: string;
  serialNumber: string;
  model: DroneModel;
  homeBase: AssetHomeBase;
  operationalStatus: AssetOperationalStatus;
  purchaseDate: string;
  firmwareVersion: string;
  drtk3BaseSerial: string;
  rtkCalibrationMode: RtkCalibrationMode;
  insuranceExpiry: string;
  lastMaintenanceDate: string;
  nextMaintenanceDue: string;
  totalFlightHours: number;
  storageUsedGb: number;
  assignedClientId: string | null;
  controlSource: ControlSource;
  notes: string;
  /** Links live simulator telemetry when set (matches DRONE_ID). */
  telemetryDroneId?: string;
};

export const DRONE_MODEL_OPTIONS: DroneModel[] = ["DJI Matrice 4T"];

export const ASSET_HOME_BASE_OPTIONS: AssetHomeBase[] = ["Barcelona", "Porto", "Oxford"];

export const ASSET_STATUS_OPTIONS: AssetOperationalStatus[] = [
  "Standby",
  "In Flight",
  "In Hangar",
  "Maintenance",
  "Stopped",
];

export const RTK_CALIBRATION_OPTIONS: RtkCalibrationMode[] = [
  "Uncalibrated",
  "Satellite Differential",
  "Network RTK",
];

export const CONTROL_SOURCE_OPTIONS: ControlSource[] = ["RC", "App", "Cloud"];

export const FIRMWARE_VERSION_OPTIONS = [
  "v09.02.0001",
  "v09.01.0014",
  "v08.04.0008",
] as const;

let assetCounter = 3;

export function createAssetId() {
  assetCounter += 1;
  return `asset-${assetCounter}`;
}

export function createInitialAssets(): ManagedAsset[] {
  return [
    {
      id: "asset-1",
      assetTag: "DC-M4T-BCN",
      serialNumber: "1581F5BKD22800123456",
      model: "DJI Matrice 4T",
      homeBase: "Barcelona",
      operationalStatus: "Standby",
      purchaseDate: "2024-03-12",
      firmwareVersion: "v09.02.0001",
      drtk3BaseSerial: "DRTK3-BCN-0041",
      rtkCalibrationMode: "Network RTK",
      insuranceExpiry: "2027-03-11",
      lastMaintenanceDate: "2026-05-02",
      nextMaintenanceDue: "2026-11-02",
      totalFlightHours: 412,
      storageUsedGb: 128,
      assignedClientId: "client-1",
      controlSource: "Cloud",
      notes: "Riells del Fai corridor support · wide + thermal payload verified.",
    },
    {
      id: "asset-2",
      assetTag: "DC-M4T-PRT",
      serialNumber: "1581F5BKD22800987654",
      model: "DJI Matrice 4T",
      homeBase: "Porto",
      operationalStatus: "In Hangar",
      purchaseDate: "2024-07-18",
      firmwareVersion: "v09.01.0014",
      drtk3BaseSerial: "DRTK3-PRT-0018",
      rtkCalibrationMode: "Satellite Differential",
      insuranceExpiry: "2026-07-17",
      lastMaintenanceDate: "2026-04-20",
      nextMaintenanceDue: "2026-10-20",
      totalFlightHours: 286,
      storageUsedGb: 64,
      assignedClientId: "client-2",
      controlSource: "App",
      notes: "Douro logistics corridor mapping · spare battery set B on charge.",
    },
    {
      id: "asset-3",
      assetTag: "DC-M4T-OXF",
      serialNumber: "1581F5BKD22800445566",
      model: "DJI Matrice 4T",
      homeBase: "Oxford",
      operationalStatus: "Standby",
      purchaseDate: "2025-01-09",
      firmwareVersion: "v09.02.0001",
      drtk3BaseSerial: "DRTK3-OXF-0007",
      rtkCalibrationMode: "Network RTK",
      insuranceExpiry: "2027-01-08",
      lastMaintenanceDate: "2026-06-01",
      nextMaintenanceDue: "2026-12-01",
      totalFlightHours: 118,
      storageUsedGb: 32,
      assignedClientId: "client-3",
      controlSource: "Cloud",
      notes: "FlightHub sandbox linked asset · primary demo airframe.",
      telemetryDroneId: "DC-TEST-001",
    },
  ];
}

export function createBlankAsset(): ManagedAsset {
  return {
    id: createAssetId(),
    assetTag: "",
    serialNumber: "",
    model: "DJI Matrice 4T",
    homeBase: "Oxford",
    operationalStatus: "Standby",
    purchaseDate: new Date().toISOString().slice(0, 10),
    firmwareVersion: FIRMWARE_VERSION_OPTIONS[0],
    drtk3BaseSerial: "",
    rtkCalibrationMode: "Uncalibrated",
    insuranceExpiry: "",
    lastMaintenanceDate: "",
    nextMaintenanceDue: "",
    totalFlightHours: 0,
    storageUsedGb: 0,
    assignedClientId: null,
    controlSource: "RC",
    notes: "",
  };
}

export function assetStatusClass(status: AssetOperationalStatus | string) {
  switch (status) {
    case "In Flight":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
    case "Standby":
      return "border-sky-400/40 bg-sky-500/15 text-sky-300";
    case "Stopped":
      return "border-white/20 bg-white/10 text-white/60";
    case "Maintenance":
      return "border-amber-400/40 bg-amber-500/15 text-amber-200";
    case "In Hangar":
      return "border-violet-400/40 bg-violet-500/15 text-violet-200";
    default:
      return "border-white/15 bg-white/5 text-white/50";
  }
}

export function formatAssetDate(value: string) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
