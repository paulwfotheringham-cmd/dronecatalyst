export type CompetitorRegion = "uk" | "spain" | "portugal";

export type Competitor = {
  id: string;
  region: CompetitorRegion;
  companyName: string;
  website: string;
  services: string;
  lastRevenue: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export const COMPETITOR_REGIONS: {
  id: CompetitorRegion;
  title: string;
  subtitle: string;
}[] = [
  { id: "uk", title: "UK", subtitle: "Oxford & national market" },
  { id: "spain", title: "Spain", subtitle: "Barcelona & Iberia" },
  { id: "portugal", title: "Portugal", subtitle: "Porto & national market" },
];

type DbCompetitor = {
  id: string;
  region: CompetitorRegion;
  company_name: string;
  website: string | null;
  services: string | null;
  last_revenue: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapCompetitor(row: DbCompetitor): Competitor {
  return {
    id: row.id,
    region: row.region,
    companyName: row.company_name,
    website: row.website ?? "",
    services: row.services ?? "",
    lastRevenue: row.last_revenue ?? "",
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createBlankCompetitorInput(region: CompetitorRegion) {
  return {
    region,
    companyName: "New Company",
    website: "",
    services: "",
    lastRevenue: "",
  };
}
