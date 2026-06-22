export type StrategyCategory = "surveying" | "inspection" | "media";

export type StrategyItem = {
  id: string;
  category: StrategyCategory;
  label: string;
  sortOrder: number;
  notes: string;
  priority: number | null;
  updatedAt: string;
};

export const STRATEGY_PRIORITY_OPTIONS = [1, 2, 3, 4, 5] as const;

export const STRATEGY_COLUMNS: {
  id: StrategyCategory;
  title: string;
  labels: string[];
}[] = [
  {
    id: "surveying",
    title: "Surveying & Geospatial Intelligence",
    labels: [
      "Stockpile & volume Analytics",
      "Construction & volume Surveying",
      "Site measurements",
      "Earthworks monitoring",
      "Construction progress intelligence",
      "Point clouds",
      "Orthomosaics",
      "DSM/DTM models",
      "Volumetrics",
      "Progress comparison",
    ],
  },
  {
    id: "inspection",
    title: "Inspection & Asset Intelligence",
    labels: [
      "Building & roof inspections",
      "Solar inspections (thermal)",
      "Industrial inspections",
      "Warehouses",
      "Logistics parks",
      "Rail inspections",
      "Road inspections",
      "Pipeline inspections",
      "Utility inspections",
      "Asset condition reporting",
    ],
  },
  {
    id: "media",
    title: "Premium Media & Broadcast",
    labels: [
      "Real estate",
      "Hospitality",
      "Tourism",
      "Construction marketing",
      "Marinas",
      "Ports",
      "Yacht marketing",
      "Corporate content",
      "Event coverage",
    ],
  },
];

type DbStrategyItem = {
  id: string;
  category: StrategyCategory;
  label: string;
  sort_order: number;
  notes: string | null;
  priority: number | null;
  updated_at: string;
};

export function mapStrategyItem(row: DbStrategyItem): StrategyItem {
  return {
    id: row.id,
    category: row.category,
    label: row.label,
    sortOrder: row.sort_order,
    notes: row.notes ?? "",
    priority: row.priority,
    updatedAt: row.updated_at,
  };
}
