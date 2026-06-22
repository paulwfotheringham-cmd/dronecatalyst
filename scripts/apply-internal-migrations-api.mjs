import { readFileSync } from "node:fs";
import { join } from "node:path";

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF ?? "luvqotlljbfmnfwhoypz";

if (!token) {
  console.error("Missing SUPABASE_ACCESS_TOKEN");
  process.exit(1);
}

const migrations = [
  "supabase/migrations/007_create_competitors.sql",
  "supabase/migrations/008_create_internal_whiteboard.sql",
];

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

for (const migrationPath of migrations) {
  const sql = readFileSync(join(process.cwd(), migrationPath), "utf8");
  const result = await query(sql);
  console.log(migrationPath, result.status, JSON.stringify(result.data).slice(0, 300));
}

const check = await query(
  `select table_name
   from information_schema.tables
   where table_schema = 'public'
     and table_name in ('competitors', 'internal_whiteboard')
   order by table_name`,
);

console.log("tables", check.status, JSON.stringify(check.data));

await query(`notify pgrst, 'reload schema'`);
console.log("schema reload notified");
