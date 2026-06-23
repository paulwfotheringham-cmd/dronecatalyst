import { readFileSync } from "node:fs";
import { join } from "node:path";

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF ?? "luvqotlljbfmnfwhoypz";

if (!token) {
  console.error("Missing SUPABASE_ACCESS_TOKEN");
  process.exit(1);
}

async function query(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  const data = await res.json();
  return { status: res.status, data };
}

const sql = readFileSync(
  join(process.cwd(), "supabase/migrations/012_competitors_drone_tech_spain_portugal.sql"),
  "utf8",
);

const result = await query(sql);
console.log("seed", result.status, JSON.stringify(result.data).slice(0, 800));

for (const region of ["uk", "spain", "portugal"]) {
  const count = await query(
    `select count(*)::int as count from public.competitors where region = '${region}'`,
  );
  console.log(`${region}_count`, count.status, JSON.stringify(count.data));
}

await query(`notify pgrst, 'reload schema'`);
