const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/save-zoho-credentials.mjs <password>");
  process.exit(1);
}

const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("Missing SUPABASE_ACCESS_TOKEN");
  process.exit(1);
}

const rows = [
  { account_id: "info", email: "info@dronecatalyst.com" },
  { account_id: "paul", email: "paul@dronecatalyst.com" },
];

async function query(sql) {
  const res = await fetch("https://api.supabase.com/v1/projects/luvqotlljbfmnfwhoypz/database/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  return { status: res.status, data: await res.json() };
}

for (const row of rows) {
  const escaped = password.replace(/'/g, "''");
  const result = await query(`
    insert into public.email_mailbox_credentials (account_id, email, password, updated_at)
    values ('${row.account_id}', '${row.email}', '${escaped}', now())
    on conflict (account_id) do update
      set email = excluded.email,
          password = excluded.password,
          updated_at = now();
  `);
  console.log(row.account_id, result.status, JSON.stringify(result.data));
}
